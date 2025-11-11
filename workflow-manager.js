// ============================================================================
// WORKFLOW MANAGER - Conversation Branches, Context Management, Examples
// ============================================================================

const ConversationBranches = {
  // Create new conversation
  async createConversation(name, initialMessage = null) {
    const data = await chrome.storage.local.get(['conversations']);
    const conversations = data.conversations || {};

    const convId = 'conv_' + Date.now();
    const rootNodeId = 'node_' + Date.now();

    conversations[convId] = {
      id: convId,
      name: name || 'Untitled Conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      nodes: {
        [rootNodeId]: {
          id: rootNodeId,
          content: initialMessage || '',
          role: 'user',
          parentId: null,
          children: [],
          timestamp: Date.now(),
          metadata: {}
        }
      },
      branches: [{
        id: 'main',
        name: 'Main',
        headNodeId: rootNodeId,
        color: '#4285f4'
      }],
      activeBranch: 'main'
    };

    await chrome.storage.local.set({ conversations });
    return convId;
  },

  // Add message to conversation
  async addMessage(convId, content, role = 'user', parentNodeId = null) {
    const data = await chrome.storage.local.get(['conversations']);
    const conversations = data.conversations || {};
    const conv = conversations[convId];

    if (!conv) throw new Error('Conversation not found');

    const nodeId = 'node_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // Get current head if no parent specified
    if (!parentNodeId) {
      const activeBranch = conv.branches.find(b => b.id === conv.activeBranch);
      parentNodeId = activeBranch.headNodeId;
    }

    // Create new node
    conv.nodes[nodeId] = {
      id: nodeId,
      content,
      role,
      parentId: parentNodeId,
      children: [],
      timestamp: Date.now(),
      metadata: {}
    };

    // Update parent's children
    if (parentNodeId && conv.nodes[parentNodeId]) {
      conv.nodes[parentNodeId].children.push(nodeId);
    }

    // Update active branch head
    const activeBranch = conv.branches.find(b => b.id === conv.activeBranch);
    activeBranch.headNodeId = nodeId;

    conv.updatedAt = Date.now();
    await chrome.storage.local.set({ conversations });

    return nodeId;
  },

  // Create new branch from a node
  async createBranch(convId, branchName, fromNodeId) {
    const data = await chrome.storage.local.get(['conversations']);
    const conversations = data.conversations || {};
    const conv = conversations[convId];

    if (!conv) throw new Error('Conversation not found');

    const branchId = 'branch_' + Date.now();
    const colors = ['#ea4335', '#34a853', '#fbbc04', '#673ab7', '#ff6d00'];
    const color = colors[conv.branches.length % colors.length];

    conv.branches.push({
      id: branchId,
      name: branchName,
      headNodeId: fromNodeId,
      color,
      createdAt: Date.now()
    });

    await chrome.storage.local.set({ conversations });
    return branchId;
  },

  // Switch active branch
  async switchBranch(convId, branchId) {
    const data = await chrome.storage.local.get(['conversations']);
    const conversations = data.conversations || {};
    const conv = conversations[convId];

    if (!conv) throw new Error('Conversation not found');

    const branch = conv.branches.find(b => b.id === branchId);
    if (!branch) throw new Error('Branch not found');

    conv.activeBranch = branchId;
    await chrome.storage.local.set({ conversations });
  },

  // Get conversation tree (for visualization)
  async getTree(convId) {
    const data = await chrome.storage.local.get(['conversations']);
    const conversations = data.conversations || {};
    const conv = conversations[convId];

    if (!conv) throw new Error('Conversation not found');

    // Build tree structure
    const buildTree = (nodeId) => {
      const node = conv.nodes[nodeId];
      if (!node) return null;

      return {
        ...node,
        children: node.children.map(childId => buildTree(childId)).filter(Boolean)
      };
    };

    // Find root node
    const rootNode = Object.values(conv.nodes).find(n => n.parentId === null);

    return {
      conversation: {
        id: conv.id,
        name: conv.name,
        branches: conv.branches,
        activeBranch: conv.activeBranch
      },
      tree: rootNode ? buildTree(rootNode.id) : null
    };
  },

  // Compare outcomes across branches
  async compareBranches(convId, branchIds) {
    const data = await chrome.storage.local.get(['conversations']);
    const conversations = data.conversations || {};
    const conv = conversations[convId];

    if (!conv) throw new Error('Conversation not found');

    const comparison = branchIds.map(branchId => {
      const branch = conv.branches.find(b => b.id === branchId);
      if (!branch) return null;

      // Get all messages in this branch
      const messages = [];
      let currentNodeId = branch.headNodeId;

      while (currentNodeId) {
        const node = conv.nodes[currentNodeId];
        if (!node) break;
        messages.unshift(node);
        currentNodeId = node.parentId;
      }

      return {
        branchId: branch.id,
        branchName: branch.name,
        messages,
        messageCount: messages.length,
        lastUpdated: messages[messages.length - 1]?.timestamp
      };
    }).filter(Boolean);

    return comparison;
  }
};

// Context Manager
const ContextManager = {
  // Analyze context window usage
  analyzeContext(messages, maxTokens = 200000) {
    const analysis = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      tokens: TokenCounter.estimate(msg.content),
      timestamp: msg.timestamp
    }));

    const totalTokens = analysis.reduce((sum, m) => sum + m.tokens, 0);
    const percentUsed = (totalTokens / maxTokens) * 100;

    return {
      messages: analysis,
      totalTokens,
      maxTokens,
      percentUsed: percentUsed.toFixed(1),
      remaining: maxTokens - totalTokens,
      status: percentUsed > 90 ? 'critical' : percentUsed > 70 ? 'warning' : 'ok'
    };
  },

  // Suggest what to remove
  suggestOptimization(messages, targetReduction = 0.3) {
    // Rank messages by importance
    const ranked = messages.map((msg, index) => {
      let importance = 0;

      // Recent messages are more important
      const recency = (messages.length - index) / messages.length;
      importance += recency * 40;

      // Shorter messages might be less critical
      const tokens = TokenCounter.estimate(msg.content);
      if (tokens < 50) importance += 20; // Keep short messages
      if (tokens > 1000) importance -= 10; // Long messages are candidates for removal

      // System/assistant messages more important than user
      if (msg.role === 'system') importance += 30;
      if (msg.role === 'assistant') importance += 10;

      // Messages with code or structured data more important
      if (msg.content.includes('```') || msg.content.includes('json')) {
        importance += 15;
      }

      return {
        ...msg,
        importance,
        tokens
      };
    });

    // Sort by importance (ascending - lowest first are removal candidates)
    ranked.sort((a, b) => a.importance - b.importance);

    // Calculate removal candidates
    const totalTokens = ranked.reduce((sum, m) => sum + m.tokens, 0);
    const targetTokens = Math.floor(totalTokens * targetReduction);

    let removedTokens = 0;
    const toRemove = [];
    const toKeep = [];

    for (const msg of ranked) {
      if (removedTokens < targetTokens && msg.role !== 'system') {
        toRemove.push(msg);
        removedTokens += msg.tokens;
      } else {
        toKeep.push(msg);
      }
    }

    return {
      toRemove: toRemove.map(m => ({ ...m, reason: 'Low importance' })),
      toKeep,
      tokensSaved: removedTokens,
      percentReduction: ((removedTokens / totalTokens) * 100).toFixed(1)
    };
  },

  // Smart summarization (rule-based)
  summarizeMessages(messages) {
    // Group consecutive messages by role
    const groups = [];
    let currentGroup = null;

    messages.forEach(msg => {
      if (!currentGroup || currentGroup.role !== msg.role) {
        currentGroup = { role: msg.role, messages: [] };
        groups.push(currentGroup);
      }
      currentGroup.messages.push(msg);
    });

    // Summarize each group
    const summarized = groups.map(group => {
      if (group.messages.length === 1) {
        return group.messages[0];
      }

      // Combine multiple messages
      const combined = group.messages.map(m => m.content).join('\n\n');
      const tokens = TokenCounter.estimate(combined);

      if (tokens < 500) {
        // Short enough, keep as-is
        return { role: group.role, content: combined };
      } else {
        // Create summary
        return {
          role: group.role,
          content: `[Summary of ${group.messages.length} messages, ${tokens} tokens]:\n${combined.substring(0, 500)}...`,
          metadata: { summarized: true, originalCount: group.messages.length }
        };
      }
    });

    const originalTokens = TokenCounter.fromMessages(messages);
    const newTokens = TokenCounter.fromMessages(summarized);

    return {
      summarized,
      originalTokens,
      newTokens,
      savings: originalTokens - newTokens,
      percentSaved: ((1 - newTokens / originalTokens) * 100).toFixed(1)
    };
  }
};

// Few-Shot Example Manager
const ExampleManager = {
  // Store examples library
  async addExample(category, example) {
    const data = await chrome.storage.local.get(['examplesLibrary']);
    const library = data.examplesLibrary || {};

    if (!library[category]) {
      library[category] = [];
    }

    const exampleEntry = {
      id: 'example_' + Date.now(),
      input: example.input,
      output: example.output,
      description: example.description || '',
      tags: example.tags || [],
      createdAt: Date.now()
    };

    library[category].push(exampleEntry);
    await chrome.storage.local.set({ examplesLibrary: library });

    return exampleEntry.id;
  },

  // Get examples for a category
  async getExamples(category) {
    const data = await chrome.storage.local.get(['examplesLibrary']);
    const library = data.examplesLibrary || {};
    return library[category] || [];
  },

  // Generate few-shot prompt
  async generateFewShotPrompt(basePrompt, category, count = 3) {
    const examples = await this.getExamples(category);

    if (examples.length === 0) {
      return basePrompt + '\n\n(No examples available)';
    }

    const selectedExamples = examples.slice(0, count);
    const exampleText = selectedExamples.map((ex, i) => {
      return `Example ${i + 1}:\nInput: ${ex.input}\nOutput: ${ex.output}`;
    }).join('\n\n');

    return `${basePrompt}\n\nHere are some examples:\n\n${exampleText}`;
  },

  // Import examples from prompt
  parseExamplesFromPrompt(promptText) {
    const examples = [];

    // Try to find input/output pairs
    const regex = /(?:example|input)[:\s]*(.+?)\s*(?:output|result)[:\s]*(.+?)(?=\n\n|example|$)/gis;
    let match;

    while ((match = regex.exec(promptText)) !== null) {
      examples.push({
        input: match[1].trim(),
        output: match[2].trim()
      });
    }

    return examples;
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ConversationBranches, ContextManager, ExampleManager };
}
