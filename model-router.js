// ============================================================================
// MODEL ROUTER - Intelligent Model Selection Based on Task & Budget
// ============================================================================

const ModelRouter = {
  // Model capabilities and characteristics
  models: {
    'claude-sonnet-4': {
      strengths: ['reasoning', 'code', 'analysis', 'long-context'],
      speed: 'medium',
      cost: 'high',
      maxTokens: 200000,
      quality: 95
    },
    'claude-sonnet-3.5': {
      strengths: ['reasoning', 'code', 'analysis'],
      speed: 'medium',
      cost: 'high',
      maxTokens: 200000,
      quality: 93
    },
    'claude-haiku': {
      strengths: ['speed', 'simple-tasks', 'classification'],
      speed: 'very-fast',
      cost: 'very-low',
      maxTokens: 200000,
      quality: 75
    },
    'gpt-4': {
      strengths: ['reasoning', 'creative', 'complex'],
      speed: 'slow',
      cost: 'very-high',
      maxTokens: 8192,
      quality: 92
    },
    'gpt-4-turbo': {
      strengths: ['reasoning', 'code', 'analysis'],
      speed: 'medium',
      cost: 'high',
      maxTokens: 128000,
      quality: 90
    },
    'gpt-4o': {
      strengths: ['balanced', 'multimodal'],
      speed: 'fast',
      cost: 'medium',
      maxTokens: 128000,
      quality: 88
    },
    'gpt-4o-mini': {
      strengths: ['speed', 'simple-tasks', 'cost'],
      speed: 'very-fast',
      cost: 'very-low',
      maxTokens: 128000,
      quality: 78
    },
    'gpt-3.5-turbo': {
      strengths: ['speed', 'simple-tasks'],
      speed: 'very-fast',
      cost: 'very-low',
      maxTokens: 16385,
      quality: 70
    }
  },

  // Routing rules
  route(promptText, context = {}) {
    const {
      taskType = 'general',
      priority = 'balanced', // 'speed', 'quality', 'cost', 'balanced'
      budget = null,
      userPreference = null
    } = context;

    // If user has preference, use it
    if (userPreference) {
      return { model: userPreference, reason: 'User preference' };
    }

    const tokens = TokenCounter.estimate(promptText);
    let candidates = Object.keys(this.models);

    // Filter by token limit
    candidates = candidates.filter(model => {
      return this.models[model].maxTokens >= tokens;
    });

    // Score each model
    const scored = candidates.map(model => {
      const modelInfo = this.models[model];
      let score = 0;

      // Task type match
      if (modelInfo.strengths.includes(taskType)) {
        score += 30;
      }

      // Priority weighting
      if (priority === 'speed') {
        score += modelInfo.speed === 'very-fast' ? 40 : modelInfo.speed === 'fast' ? 30 : 10;
      } else if (priority === 'quality') {
        score += modelInfo.quality;
      } else if (priority === 'cost') {
        score += modelInfo.cost === 'very-low' ? 40 : modelInfo.cost === 'low' ? 30 : 10;
      } else { // balanced
        score += (modelInfo.quality * 0.4) +
                 (modelInfo.speed === 'very-fast' ? 20 : modelInfo.speed === 'fast' ? 15 : 10) +
                 (modelInfo.cost === 'very-low' ? 20 : modelInfo.cost === 'low' ? 15 : 5);
      }

      // Calculate estimated cost
      const estimatedCost = CostCalculator.estimatePromptCost(promptText, model);

      return {
        model,
        score,
        estimatedCost: estimatedCost.perUse,
        quality: modelInfo.quality,
        speed: modelInfo.speed,
        reasoning: []
      };
    });

    // Sort by score
    scored.sort((a, b) => b.score - a.score);

    // Build reasoning
    const selected = scored[0];
    selected.reasoning.push(`Task type: ${taskType}`);
    selected.reasoning.push(`Priority: ${priority}`);
    selected.reasoning.push(`Estimated cost: $${selected.estimatedCost.toFixed(4)}`);

    return {
      model: selected.model,
      alternatives: scored.slice(1, 3),
      reason: selected.reasoning.join(', '),
      estimatedCost: selected.estimatedCost,
      quality: selected.quality
    };
  },

  // Get cost comparison across models
  compareCosts(promptText, estimatedOutputTokens = 500) {
    return Object.keys(this.models).map(model => {
      const cost = CostCalculator.calculate(
        TokenCounter.estimate(promptText),
        estimatedOutputTokens,
        model
      );

      return {
        model,
        inputCost: cost.input,
        outputCost: cost.output,
        totalCost: cost.total,
        quality: this.models[model].quality,
        speed: this.models[model].speed
      };
    }).sort((a, b) => a.totalCost - b.totalCost);
  },

  // Budget-aware routing
  routeWithBudget(promptText, budget, taskType = 'general') {
    const costs = this.compareCosts(promptText);

    // Find models within budget
    const affordable = costs.filter(c => c.totalCost <= budget);

    if (affordable.length === 0) {
      return {
        model: null,
        error: 'No models available within budget',
        cheapestOption: costs[0],
        budgetShortfall: costs[0].totalCost - budget
      };
    }

    // Among affordable, pick highest quality that matches task
    const suitable = affordable.filter(c => {
      const modelInfo = this.models[c.model];
      return modelInfo.strengths.includes(taskType);
    });

    const selected = suitable.length > 0 ? suitable[0] : affordable[0];

    return {
      model: selected.model,
      cost: selected.totalCost,
      quality: selected.quality,
      reason: `Best quality within $${budget} budget`,
      savings: budget - selected.totalCost
    };
  }
};

// Security Scanner
const SecurityScanner = {
  // Scan prompt for security issues
  scan(promptText, context = {}) {
    const issues = [];
    const warnings = [];
    const text = promptText.toLowerCase();

    // Check for PII patterns
    const piiPatterns = {
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
      phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/,
      ssn: /\b\d{3}-\d{2}-\d{4}\b/,
      creditCard: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,
      apiKey: /\b(sk-|pk_live_|pk_test_)[a-zA-Z0-9]{20,}\b/
    };

    Object.entries(piiPatterns).forEach(([type, regex]) => {
      if (regex.test(promptText)) {
        issues.push({
          severity: 'high',
          type: 'pii-exposure',
          message: `Potential ${type} detected in prompt`,
          recommendation: 'Remove sensitive data or use placeholders'
        });
      }
    });

    // Check for prompt injection patterns
    const injectionPatterns = [
      /ignore\s+(all\s+)?previous\s+instructions/i,
      /disregard\s+(all\s+)?(previous|above)/i,
      /forget\s+everything/i,
      /new\s+instructions:/i,
      /system:\s+you\s+are\s+now/i
    ];

    injectionPatterns.forEach(pattern => {
      if (pattern.test(promptText)) {
        warnings.push({
          severity: 'medium',
          type: 'injection-pattern',
          message: 'Prompt contains potential injection pattern',
          recommendation: 'Review if this is intentional or user input'
        });
      }
    });

    // Check for jailbreak attempts
    const jailbreakPatterns = [
      /DAN mode/i,
      /developer mode/i,
      /bypass\s+(your\s+)?(safety|ethical|moral)/i,
      /pretend\s+you\s+(have\s+)?no\s+(rules|restrictions)/i
    ];

    jailbreakPatterns.forEach(pattern => {
      if (pattern.test(promptText)) {
        issues.push({
          severity: 'high',
          type: 'jailbreak-attempt',
          message: 'Prompt contains potential jailbreak pattern',
          recommendation: 'Remove or rephrase this section'
        });
      }
    });

    // Check for excessive permissions
    if (text.includes('access') && (text.includes('file') || text.includes('system'))) {
      warnings.push({
        severity: 'low',
        type: 'permission-request',
        message: 'Prompt requests file/system access',
        recommendation: 'Ensure this is necessary and safe'
      });
    }

    // Check for data exfiltration patterns
    if ((text.includes('send') || text.includes('post')) &&
        (text.includes('url') || text.includes('http') || text.includes('api'))) {
      warnings.push({
        severity: 'medium',
        type: 'data-exfiltration',
        message: 'Prompt may attempt to send data externally',
        recommendation: 'Verify external endpoints are trusted'
      });
    }

    // Calculate security score
    const criticalCount = issues.filter(i => i.severity === 'high').length;
    const warningCount = warnings.filter(w => w.severity === 'medium').length;
    const infoCount = warnings.filter(w => w.severity === 'low').length;

    let score = 100;
    score -= criticalCount * 30;
    score -= warningCount * 15;
    score -= infoCount * 5;
    score = Math.max(0, score);

    return {
      score,
      grade: score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F',
      issues,
      warnings,
      safe: issues.length === 0,
      recommendation: issues.length > 0
        ? 'Review and fix security issues before using'
        : warnings.length > 0
        ? 'Consider addressing warnings'
        : 'Prompt appears safe'
    };
  },

  // Sanitize prompt
  sanitize(promptText) {
    let sanitized = promptText;

    // Remove email addresses
    sanitized = sanitized.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]');

    // Remove phone numbers
    sanitized = sanitized.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[PHONE]');

    // Remove potential API keys
    sanitized = sanitized.replace(/\b(sk-|pk_live_|pk_test_)[a-zA-Z0-9]{20,}\b/g, '[API_KEY]');

    // Remove SSNs
    sanitized = sanitized.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]');

    // Remove credit cards
    sanitized = sanitized.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[CARD]');

    return {
      sanitized,
      changesMade: sanitized !== promptText,
      removedItems: sanitized.match(/\[[\w_]+\]/g) || []
    };
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ModelRouter, SecurityScanner };
}
