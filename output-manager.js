// ============================================================================
// OUTPUT MANAGER - Store, Compare, and Analyze AI Outputs
// ============================================================================

const OutputManager = {
  // Store AI output with metadata
  async storeOutput(promptIndex, outputData) {
    const data = await chrome.storage.local.get(['promptOutputs']);
    const outputs = data.promptOutputs || {};

    if (!outputs[promptIndex]) {
      outputs[promptIndex] = [];
    }

    const outputEntry = {
      id: 'output_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      output: outputData.text,
      model: outputData.model || 'unknown',
      tokens: {
        input: outputData.inputTokens || TokenCounter.estimate(outputData.prompt),
        output: outputData.outputTokens || TokenCounter.estimate(outputData.text)
      },
      cost: outputData.cost || null,
      quality: outputData.quality || null, // User rating
      promptVersion: outputData.promptVersion || 1,
      metadata: outputData.metadata || {}
    };

    outputs[promptIndex].push(outputEntry);

    // Keep last 20 outputs per prompt
    if (outputs[promptIndex].length > 20) {
      outputs[promptIndex] = outputs[promptIndex].slice(-20);
    }

    await chrome.storage.local.set({ promptOutputs: outputs });

    return outputEntry.id;
  },

  // Get all outputs for a prompt
  async getOutputs(promptIndex) {
    const data = await chrome.storage.local.get(['promptOutputs']);
    const outputs = data.promptOutputs || {};
    return outputs[promptIndex] || [];
  },

  // Compare two outputs side-by-side
  async compareOutputs(promptIndex, outputId1, outputId2) {
    const outputs = await this.getOutputs(promptIndex);
    const output1 = outputs.find(o => o.id === outputId1);
    const output2 = outputs.find(o => o.id === outputId2);

    if (!output1 || !output2) {
      throw new Error('Outputs not found');
    }

    const comparison = {
      output1,
      output2,
      differences: {
        length: {
          output1: output1.output.length,
          output2: output2.output.length,
          diff: Math.abs(output1.output.length - output2.output.length)
        },
        tokens: {
          output1: output1.tokens.output,
          output2: output2.tokens.output,
          diff: Math.abs(output1.tokens.output - output2.tokens.output)
        },
        cost: {
          output1: output1.cost?.total || 0,
          output2: output2.cost?.total || 0,
          savings: Math.abs((output1.cost?.total || 0) - (output2.cost?.total || 0))
        }
      },
      recommendation: null
    };

    // Make recommendation
    if (output1.quality && output2.quality) {
      if (output1.quality > output2.quality) {
        comparison.recommendation = 'output1';
      } else if (output2.quality > output1.quality) {
        comparison.recommendation = 'output2';
      } else {
        // Same quality, recommend cheaper
        comparison.recommendation = output1.cost?.total < output2.cost?.total ? 'output1' : 'output2';
      }
    }

    return comparison;
  },

  // Get statistics for a prompt
  async getStats(promptIndex) {
    const outputs = await this.getOutputs(promptIndex);

    if (outputs.length === 0) {
      return null;
    }

    const totalCost = outputs.reduce((sum, o) => sum + (o.cost?.total || 0), 0);
    const totalTokens = outputs.reduce((sum, o) => sum + o.tokens.output, 0);
    const avgQuality = outputs.filter(o => o.quality).length > 0
      ? outputs.filter(o => o.quality).reduce((sum, o) => sum + o.quality, 0) / outputs.filter(o => o.quality).length
      : null;

    return {
      totalOutputs: outputs.length,
      totalCost: totalCost.toFixed(4),
      totalTokens,
      avgQuality: avgQuality ? avgQuality.toFixed(1) : null,
      avgOutputLength: Math.round(outputs.reduce((sum, o) => sum + o.output.length, 0) / outputs.length),
      modelBreakdown: this._getModelBreakdown(outputs)
    };
  },

  _getModelBreakdown(outputs) {
    const breakdown = {};
    outputs.forEach(output => {
      const model = output.model || 'unknown';
      if (!breakdown[model]) {
        breakdown[model] = { count: 0, cost: 0 };
      }
      breakdown[model].count++;
      breakdown[model].cost += output.cost?.total || 0;
    });
    return breakdown;
  },

  // Export outputs for a prompt
  async exportOutputs(promptIndex, format = 'json') {
    const outputs = await this.getOutputs(promptIndex);

    if (format === 'json') {
      return JSON.stringify(outputs, null, 2);
    } else if (format === 'csv') {
      const headers = ['Timestamp', 'Model', 'Quality', 'Tokens', 'Cost', 'Output'];
      const rows = outputs.map(o => [
        new Date(o.timestamp).toISOString(),
        o.model,
        o.quality || '',
        o.tokens.output,
        o.cost?.total?.toFixed(4) || '',
        `"${o.output.replace(/"/g, '""')}"`
      ]);
      return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (format === 'markdown') {
      let md = '# Outputs\n\n';
      outputs.forEach((o, i) => {
        md += `## Output ${i + 1} (${new Date(o.timestamp).toLocaleString()})\n\n`;
        md += `**Model:** ${o.model}\n`;
        md += `**Tokens:** ${o.tokens.output}\n`;
        if (o.quality) md += `**Quality:** ${o.quality}/5\n`;
        md += `\n${o.output}\n\n---\n\n`;
      });
      return md;
    }
  }
};

// A/B Testing Framework
const ABTestingFramework = {
  // Create A/B test
  async createTest(testConfig) {
    const data = await chrome.storage.local.get(['abTests']);
    const tests = data.abTests || [];

    const test = {
      id: 'test_' + Date.now(),
      name: testConfig.name,
      promptIndex: testConfig.promptIndex,
      variants: testConfig.variants.map((v, i) => ({
        id: 'variant_' + i,
        name: v.name,
        prompt: v.prompt,
        results: []
      })),
      status: 'active',
      createdAt: Date.now(),
      targetSampleSize: testConfig.targetSampleSize || 10
    };

    tests.push(test);
    await chrome.storage.local.set({ abTests: tests });

    return test.id;
  },

  // Record test result
  async recordResult(testId, variantId, result) {
    const data = await chrome.storage.local.get(['abTests']);
    const tests = data.abTests || [];

    const test = tests.find(t => t.id === testId);
    if (!test) throw new Error('Test not found');

    const variant = test.variants.find(v => v.id === variantId);
    if (!variant) throw new Error('Variant not found');

    variant.results.push({
      timestamp: Date.now(),
      quality: result.quality, // 1-5 rating
      cost: result.cost,
      tokens: result.tokens,
      timeToComplete: result.timeToComplete
    });

    // Check if test is complete
    const allVariantsHaveEnoughData = test.variants.every(
      v => v.results.length >= test.targetSampleSize
    );

    if (allVariantsHaveEnoughData) {
      test.status = 'complete';
    }

    await chrome.storage.local.set({ abTests: tests });
  },

  // Analyze test results
  async analyzeTest(testId) {
    const data = await chrome.storage.local.get(['abTests']);
    const tests = data.abTests || [];
    const test = tests.find(t => t.id === testId);

    if (!test) throw new Error('Test not found');

    const analysis = {
      testId: test.id,
      name: test.name,
      status: test.status,
      variants: test.variants.map(variant => {
        const results = variant.results;

        if (results.length === 0) {
          return {
            variantId: variant.id,
            name: variant.name,
            sampleSize: 0
          };
        }

        const avgQuality = results.reduce((sum, r) => sum + r.quality, 0) / results.length;
        const avgCost = results.reduce((sum, r) => sum + (r.cost || 0), 0) / results.length;
        const avgTokens = results.reduce((sum, r) => sum + (r.tokens || 0), 0) / results.length;

        return {
          variantId: variant.id,
          name: variant.name,
          sampleSize: results.length,
          avgQuality: avgQuality.toFixed(2),
          avgCost: avgCost.toFixed(4),
          avgTokens: Math.round(avgTokens),
          qualityScore: avgQuality * 20 // Convert to 0-100
        };
      }),
      winner: null,
      confidence: null
    };

    // Determine winner (highest quality)
    const validVariants = analysis.variants.filter(v => v.sampleSize > 0);
    if (validVariants.length > 0) {
      const sorted = validVariants.sort((a, b) => b.avgQuality - a.avgQuality);
      analysis.winner = sorted[0];

      // Calculate confidence (simple heuristic)
      if (validVariants.length > 1) {
        const diff = sorted[0].avgQuality - sorted[1].avgQuality;
        analysis.confidence = diff > 1 ? 'high' : diff > 0.5 ? 'medium' : 'low';
      }
    }

    return analysis;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OutputManager, ABTestingFramework };
}
