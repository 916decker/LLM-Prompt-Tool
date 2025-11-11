// ============================================================================
// PROMPT ASSISTANT - AI-Powered & Rule-Based Prompt Improvement
// ============================================================================

const PromptAssistant = {
  // Rule-based suggestions (works without API)
  getRuleBasedSuggestions(promptText, taskType = 'general') {
    const suggestions = [];
    const text = promptText.toLowerCase();

    // Check if prompt starts with clear instruction
    if (!text.match(/^(write|create|generate|analyze|explain|summarize|list|describe)/)) {
      suggestions.push({
        type: 'structure',
        priority: 'high',
        title: 'Start with clear action verb',
        before: promptText.substring(0, 50) + '...',
        after: 'Write a ' + promptText.substring(0, 50) + '...',
        explanation: 'Starting with a clear verb (Write, Create, Analyze) improves clarity'
      });
    }

    // Check for role definition
    if (!text.includes('you are') && !text.includes('act as')) {
      suggestions.push({
        type: 'context',
        priority: 'medium',
        title: 'Add expert role',
        before: promptText.substring(0, 50),
        after: 'You are an expert [field]. ' + promptText.substring(0, 50),
        explanation: 'Defining a role/expertise improves response quality'
      });
    }

    // Check for examples
    if (promptText.length > 100 && !text.includes('example') && !text.includes('like this')) {
      suggestions.push({
        type: 'enhancement',
        priority: 'high',
        title: 'Add examples',
        before: promptText,
        after: promptText + '\n\nExample:\nInput: [example input]\nOutput: [desired output]',
        explanation: 'Examples (few-shot learning) dramatically improve accuracy'
      });
    }

    // Check for output format
    if (!text.match(/format|structure|output as|provide as|return/)) {
      suggestions.push({
        type: 'format',
        priority: 'medium',
        title: 'Specify output format',
        before: promptText,
        after: promptText + '\n\nProvide output as: [markdown/JSON/bullet points]',
        explanation: 'Explicit format reduces ambiguity'
      });
    }

    // Check for chain-of-thought
    if (taskType === 'reasoning' && !text.includes('step by step') && !text.includes('think through')) {
      suggestions.push({
        type: 'reasoning',
        priority: 'high',
        title: 'Add chain-of-thought',
        before: promptText,
        after: promptText + '\n\nThink step by step and show your reasoning.',
        explanation: 'Chain-of-thought improves reasoning tasks by 30-50%'
      });
    }

    // Check for constraints
    if (promptText.length > 50 && !text.match(/must|should|do not|never|requirements/)) {
      suggestions.push({
        type: 'constraints',
        priority: 'low',
        title: 'Add constraints if needed',
        before: promptText,
        after: promptText + '\n\nRequirements:\n- [constraint 1]\n- [constraint 2]',
        explanation: 'Clear constraints prevent unwanted outputs'
      });
    }

    return suggestions.sort((a, b) => {
      const priority = { high: 3, medium: 2, low: 1 };
      return priority[b.priority] - priority[a.priority];
    });
  },

  // Generate improved version (rule-based)
  improvePrompt(promptText, options = {}) {
    const {
      addRole = true,
      addChainOfThought = false,
      addExamples = false,
      addFormat = true,
      taskType = 'general'
    } = options;

    let improved = promptText.trim();

    // Add role if missing
    if (addRole && !improved.toLowerCase().includes('you are')) {
      const roles = {
        'code': 'You are an expert software engineer.',
        'writing': 'You are a professional writer and editor.',
        'analysis': 'You are a data analyst and critical thinker.',
        'general': 'You are a helpful AI assistant.'
      };
      improved = (roles[taskType] || roles['general']) + ' ' + improved;
    }

    // Add chain-of-thought if requested
    if (addChainOfThought) {
      improved += '\n\nThink step by step and explain your reasoning.';
    }

    // Add example structure if requested
    if (addExamples) {
      improved += '\n\nExample:\nInput: [provide example]\nOutput: [show desired format]';
    }

    // Add format specification if missing
    if (addFormat && !improved.toLowerCase().match(/format|structure|output/)) {
      improved += '\n\nProvide your response in a clear, structured format.';
    }

    return improved;
  },

  // API-powered improvement (optional - requires API key)
  async improveWithAI(promptText, apiKey, apiProvider = 'anthropic') {
    if (!apiKey) {
      throw new Error('API key required for AI-powered improvements');
    }

    const systemPrompt = `You are an expert in prompt engineering. Analyze the given prompt and provide an improved version that:
1. Is clearer and more specific
2. Uses proven patterns (chain-of-thought, few-shot, role-based)
3. Specifies output format
4. Removes vague language
5. Maintains the original intent

Return JSON:
{
  "improved": "the improved prompt",
  "changes": ["list of changes made"],
  "reasoning": "why these changes help"
}`;

    try {
      if (apiProvider === 'anthropic') {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1024,
            messages: [{
              role: 'user',
              content: `Improve this prompt:\n\n${promptText}`
            }],
            system: systemPrompt
          })
        });

        const data = await response.json();
        const content = data.content[0].text;

        try {
          return JSON.parse(content);
        } catch {
          // If not JSON, return as-is
          return {
            improved: content,
            changes: ['AI-powered improvement'],
            reasoning: 'Improved by Claude'
          };
        }
      }
    } catch (error) {
      console.error('AI improvement failed:', error);
      throw error;
    }
  },

  // Compress prompt while preserving meaning
  compressPrompt(promptText) {
    let compressed = promptText.trim();

    // Remove excessive whitespace
    compressed = compressed.replace(/\s+/g, ' ');

    // Remove filler words
    const fillers = [
      'please',
      'kindly',
      'I would like you to',
      'Could you',
      'Can you',
      'I need you to'
    ];

    fillers.forEach(filler => {
      const regex = new RegExp(filler, 'gi');
      compressed = compressed.replace(regex, '');
    });

    // Remove redundant phrases
    compressed = compressed.replace(/that is to say/gi, 'i.e.');
    compressed = compressed.replace(/for example/gi, 'e.g.');
    compressed = compressed.replace(/in other words/gi, '');

    // Clean up
    compressed = compressed.replace(/\s+/g, ' ').trim();

    const originalTokens = TokenCounter.estimate(promptText);
    const compressedTokens = TokenCounter.estimate(compressed);
    const savings = originalTokens - compressedTokens;
    const savingsPercent = Math.round((savings / originalTokens) * 100);

    return {
      compressed,
      originalTokens,
      compressedTokens,
      savings,
      savingsPercent
    };
  },

  // Generate variations for A/B testing
  generateVariations(promptText, count = 3) {
    const variations = [];

    // Variation 1: Add chain-of-thought
    variations.push({
      name: 'With Chain-of-Thought',
      prompt: this.improvePrompt(promptText, { addChainOfThought: true }),
      expectedBenefit: 'Better reasoning quality'
    });

    // Variation 2: Add role
    variations.push({
      name: 'With Expert Role',
      prompt: this.improvePrompt(promptText, { addRole: true }),
      expectedBenefit: 'More authoritative responses'
    });

    // Variation 3: Add examples
    variations.push({
      name: 'With Examples',
      prompt: this.improvePrompt(promptText, { addExamples: true }),
      expectedBenefit: 'Better format adherence'
    });

    // Variation 4: Compressed
    const compressed = this.compressPrompt(promptText);
    variations.push({
      name: 'Compressed',
      prompt: compressed.compressed,
      expectedBenefit: `${compressed.savingsPercent}% cost reduction`
    });

    return variations.slice(0, count);
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PromptAssistant };
}
