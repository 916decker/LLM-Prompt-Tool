// ============================================================================
// CORE UTILITIES - Token Counting, Cost Calculation, Pattern Detection
// ============================================================================

// Token counter (approximation - 4 chars per token average)
const TokenCounter = {
  estimate(text) {
    if (!text) return 0;
    // More accurate estimation using word boundaries
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    // GPT-style: ~0.75 tokens per word, or chars/4
    return Math.ceil(Math.max(words * 0.75, chars / 4));
  },

  fromMessages(messages) {
    return messages.reduce((total, msg) => {
      return total + this.estimate(msg.content || '');
    }, 0);
  }
};

// Cost calculator for various models
const CostCalculator = {
  models: {
    'claude-sonnet-4': { input: 3.00, output: 15.00 }, // per 1M tokens
    'claude-sonnet-3.5': { input: 3.00, output: 15.00 },
    'claude-haiku': { input: 0.25, output: 1.25 },
    'gpt-4': { input: 30.00, output: 60.00 },
    'gpt-4-turbo': { input: 10.00, output: 30.00 },
    'gpt-3.5-turbo': { input: 0.50, output: 1.50 },
    'gpt-4o': { input: 5.00, output: 15.00 },
    'gpt-4o-mini': { input: 0.15, output: 0.60 }
  },

  calculate(promptTokens, outputTokens, model = 'claude-sonnet-4') {
    const pricing = this.models[model] || this.models['claude-sonnet-4'];
    const inputCost = (promptTokens / 1000000) * pricing.input;
    const outputCost = (outputTokens / 1000000) * pricing.output;
    return {
      input: inputCost,
      output: outputCost,
      total: inputCost + outputCost,
      perUse: inputCost + (outputCost * 0.5) // Estimate avg output
    };
  },

  estimatePromptCost(promptText, model = 'claude-sonnet-4', estimatedOutputTokens = 500) {
    const tokens = TokenCounter.estimate(promptText);
    return this.calculate(tokens, estimatedOutputTokens, model);
  }
};

// Prompt pattern definitions
const PromptPatterns = {
  patterns: [
    {
      id: 'chain-of-thought',
      name: 'Chain of Thought',
      keywords: ['think step by step', 'let\'s think', 'reasoning', 'step by step'],
      regex: /think\s+step\s+by\s+step|let'?s\s+think|reason(?:ing)?\s+through/i,
      description: 'Encourages detailed reasoning process',
      effectiveness: 'high',
      whenToUse: 'Complex reasoning, math, logic problems'
    },
    {
      id: 'role-based',
      name: 'Role-Based',
      keywords: ['you are', 'act as', 'expert', 'specialist'],
      regex: /you\s+are\s+(?:a|an)\s+[\w\s]+(?:expert|specialist|professional)|act\s+as/i,
      description: 'Assigns specific expertise/persona',
      effectiveness: 'high',
      whenToUse: 'Specialized tasks, domain knowledge needed'
    },
    {
      id: 'few-shot',
      name: 'Few-Shot Learning',
      keywords: ['example:', 'for instance', 'input:', 'output:'],
      regex: /(?:example|input|output)\s*[:]\s*[\s\S]{10,}/i,
      description: 'Provides examples to guide behavior',
      effectiveness: 'very-high',
      whenToUse: 'Format specification, style matching'
    },
    {
      id: 'constraint-based',
      name: 'Constraint-Based',
      keywords: ['must', 'should', 'do not', 'never', 'always', 'requirements:'],
      regex: /(?:must|should|do\s+not|never|always|requirements?)[\s:]/i,
      description: 'Sets explicit boundaries/rules',
      effectiveness: 'medium',
      whenToUse: 'Need specific format or boundaries'
    },
    {
      id: 'context-stuffing',
      name: 'Context Stuffing',
      keywords: ['background:', 'context:', 'given that', 'considering'],
      regex: /(?:background|context|given\s+that|considering)[\s:]/i,
      description: 'Provides extensive background info',
      effectiveness: 'medium',
      whenToUse: 'Complex domain requiring context'
    },
    {
      id: 'output-formatting',
      name: 'Output Formatting',
      keywords: ['format:', 'structure:', 'json', 'markdown', 'bullet points'],
      regex: /(?:format|structure|output)\s*[:]\s*(?:json|markdown|yaml|xml|bullet|numbered)/i,
      description: 'Specifies desired output structure',
      effectiveness: 'high',
      whenToUse: 'Structured data needed'
    },
    {
      id: 'meta-prompting',
      name: 'Meta-Prompting',
      keywords: ['critique', 'improve', 'iterate', 'refine'],
      regex: /(?:critique|improve|iterate|refine)\s+(?:your|this|the)\s+(?:answer|response|output)/i,
      description: 'AI evaluates and improves own output',
      effectiveness: 'very-high',
      whenToUse: 'Quality matters more than speed'
    },
    {
      id: 'tree-of-thought',
      name: 'Tree of Thought',
      keywords: ['explore', 'alternatives', 'consider multiple', 'different approaches'],
      regex: /(?:explore|consider)\s+(?:multiple|different|various|alternative)\s+(?:approaches|paths|solutions)/i,
      description: 'Explores multiple solution paths',
      effectiveness: 'high',
      whenToUse: 'Complex problems with multiple solutions'
    },
    {
      id: 'self-consistency',
      name: 'Self-Consistency',
      keywords: ['multiple times', 'various ways', 'check consistency'],
      regex: /(?:multiple\s+times|various\s+ways|check\s+consistency)/i,
      description: 'Generates multiple answers, picks most consistent',
      effectiveness: 'high',
      whenToUse: 'High-stakes decisions'
    },
    {
      id: 'emotional-appeal',
      name: 'Emotional/Urgency',
      keywords: ['important', 'critical', 'urgent', 'please'],
      regex: /(?:very\s+)?(?:important|critical|urgent|crucial)/i,
      description: 'Adds urgency/importance (low effectiveness)',
      effectiveness: 'low',
      whenToUse: 'Generally avoid - doesn\'t improve output'
    }
  ],

  detect(promptText) {
    const detected = [];
    const lowerText = promptText.toLowerCase();

    this.patterns.forEach(pattern => {
      const regexMatch = pattern.regex.test(promptText);
      const keywordMatch = pattern.keywords.some(kw => lowerText.includes(kw.toLowerCase()));

      if (regexMatch || keywordMatch) {
        detected.push({
          ...pattern,
          confidence: regexMatch ? 'high' : 'medium'
        });
      }
    });

    return detected;
  },

  getRecommendations(promptText, taskType = null) {
    const detected = this.detect(promptText);
    const missing = [];

    // Recommend patterns based on task type
    if (taskType === 'code') {
      if (!detected.find(p => p.id === 'few-shot')) {
        missing.push(this.patterns.find(p => p.id === 'few-shot'));
      }
      if (!detected.find(p => p.id === 'output-formatting')) {
        missing.push(this.patterns.find(p => p.id === 'output-formatting'));
      }
    }

    if (taskType === 'reasoning') {
      if (!detected.find(p => p.id === 'chain-of-thought')) {
        missing.push(this.patterns.find(p => p.id === 'chain-of-thought'));
      }
    }

    return { detected, missing: missing.filter(Boolean) };
  }
};

// Quality analyzer (rule-based)
const QualityAnalyzer = {
  analyze(promptText) {
    const tokens = TokenCounter.estimate(promptText);
    const patterns = PromptPatterns.detect(promptText);

    let score = 50; // Base score
    const issues = [];
    const suggestions = [];

    // Length checks
    if (tokens < 10) {
      score -= 20;
      issues.push({ type: 'error', message: 'Prompt too short - add more context' });
      suggestions.push('Add background context and specific instructions');
    } else if (tokens > 2000) {
      score -= 10;
      issues.push({ type: 'warning', message: 'Prompt very long - consider simplifying' });
      suggestions.push('Break into smaller, focused prompts or use context management');
    }

    // Pattern bonuses
    const highEffectivenessPatterns = patterns.filter(p => p.effectiveness === 'very-high' || p.effectiveness === 'high');
    score += highEffectivenessPatterns.length * 10;

    if (patterns.length === 0) {
      score -= 15;
      issues.push({ type: 'warning', message: 'No recognized prompt patterns detected' });
      suggestions.push('Try adding "Think step by step" or provide examples');
    }

    // Check for bad patterns
    const emotionalPattern = patterns.find(p => p.id === 'emotional-appeal');
    if (emotionalPattern) {
      score -= 5;
      issues.push({ type: 'info', message: 'Emotional language detected - typically ineffective' });
      suggestions.push('Remove phrases like "this is important" - they don\'t improve output');
    }

    // Check for specificity
    const vagueWords = ['help', 'something', 'stuff', 'things', 'good', 'better'];
    const hasVague = vagueWords.some(word => promptText.toLowerCase().includes(word));
    if (hasVague) {
      score -= 10;
      issues.push({ type: 'warning', message: 'Vague language detected' });
      suggestions.push('Be specific: instead of "help me", say "write a function that..."');
    }

    // Check for role definition
    const hasRole = patterns.some(p => p.id === 'role-based');
    if (!hasRole && tokens > 50) {
      score -= 5;
      suggestions.push('Consider adding a role: "You are an expert..."');
    }

    // Check for output format
    const hasFormat = patterns.some(p => p.id === 'output-formatting');
    if (!hasFormat && tokens > 50) {
      suggestions.push('Specify output format: "Provide as markdown list" or "Return JSON"');
    }

    // Normalize score
    score = Math.max(0, Math.min(100, score));

    return {
      score,
      grade: score >= 80 ? 'A' : score >= 65 ? 'B' : score >= 50 ? 'C' : score >= 35 ? 'D' : 'F',
      tokens,
      estimatedCost: CostCalculator.estimatePromptCost(promptText),
      patterns,
      issues,
      suggestions
    };
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TokenCounter, CostCalculator, PromptPatterns, QualityAnalyzer };
}
