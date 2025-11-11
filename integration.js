// ============================================================================
// INTEGRATION - All New Features Connected to UI
// ============================================================================

// Global state for new features
let copilotEnabled = false;
let qualityAnalysisDebounce = null;
let currentApiKeys = { anthropic: null, openai: null };

// ============================================================================
// COPILOT MODE & REAL-TIME ANALYSIS
// ============================================================================

document.getElementById('copilotToggle')?.addEventListener('change', (e) => {
  copilotEnabled = e.target.checked;

  if (copilotEnabled) {
    document.getElementById('qualityFeedback').style.display = 'block';
    document.getElementById('improvePrompt').style.display = 'inline-block';
    document.getElementById('compressPrompt').style.display = 'inline-block';
    document.getElementById('scanSecurity').style.display = 'inline-block';

    // Analyze current prompt if exists
    const promptText = document.getElementById('promptText').value;
    if (promptText) {
      analyzePromptRealtime(promptText);
    }
  } else {
    document.getElementById('qualityFeedback').style.display = 'none';
    document.getElementById('copilotPanel').style.display = 'none';
    document.getElementById('modelRouterInfo').style.display = 'none';
    document.getElementById('improvePrompt').style.display = 'none';
    document.getElementById('compressPrompt').style.display = 'none';
    document.getElementById('scanSecurity').style.display = 'none';
  }
});

// Real-time analysis as user types
document.getElementById('promptText')?.addEventListener('input', (e) => {
  if (!copilotEnabled) return;

  clearTimeout(qualityAnalysisDebounce);
  qualityAnalysisDebounce = setTimeout(() => {
    analyzePromptRealtime(e.target.value);
  }, 500); // Debounce 500ms
});

// Task type change triggers re-analysis
document.getElementById('taskTypeSelect')?.addEventListener('change', () => {
  if (copilotEnabled) {
    const promptText = document.getElementById('promptText').value;
    if (promptText) {
      analyzePromptRealtime(promptText);
    }
  }
});

function analyzePromptRealtime(promptText) {
  if (!promptText || promptText.trim().length < 10) {
    document.getElementById('qualityFeedback').style.display = 'none';
    return;
  }

  // Quality analysis
  const analysis = QualityAnalyzer.analyze(promptText);

  // Update quality display
  document.getElementById('qualityGrade').textContent = analysis.grade;
  document.getElementById('qualityScore').textContent = analysis.score;
  document.getElementById('qualityTokens').textContent = analysis.tokens;
  document.getElementById('qualityCost').textContent = '$' + analysis.estimatedCost.perUse.toFixed(4);

  // Color code the grade
  const gradeEl = document.getElementById('qualityGrade');
  gradeEl.className = 'grade-' + analysis.grade.toLowerCase();

  // Show issues
  const issuesDiv = document.getElementById('qualityIssues');
  if (analysis.issues.length > 0) {
    issuesDiv.innerHTML = '<strong>Issues:</strong>' +
      analysis.issues.map(issue =>
        `<div class="issue ${issue.type}">${issue.message}</div>`
      ).join('');
    issuesDiv.style.display = 'block';
  } else {
    issuesDiv.style.display = 'none';
  }

  // Show suggestions
  const suggestionsDiv = document.getElementById('qualitySuggestions');
  if (analysis.suggestions.length > 0) {
    suggestionsDiv.innerHTML = '<strong>Suggestions:</strong>' +
      analysis.suggestions.map(suggestion =>
        `<div class="suggestion">💡 ${suggestion}</div>`
      ).join('');
    suggestionsDiv.style.display = 'block';

    // Show copilot panel with rule-based suggestions
    showCopilotSuggestions(promptText);
  } else {
    suggestionsDiv.style.display = 'none';
  }

  document.getElementById('qualityFeedback').style.display = 'block';

  // Model routing
  routeModel(promptText);
}

function showCopilotSuggestions(promptText) {
  const taskType = document.getElementById('taskTypeSelect').value;
  const suggestions = PromptAssistant.getRuleBasedSuggestions(promptText, taskType);

  if (suggestions.length === 0) {
    document.getElementById('copilotPanel').style.display = 'none';
    return;
  }

  const copilotDiv = document.getElementById('copilotSuggestions');
  copilotDiv.innerHTML = suggestions.slice(0, 3).map(sug => `
    <div class="copilot-suggestion" data-priority="${sug.priority}">
      <div class="sug-header">
        <span class="sug-title">${sug.title}</span>
        <span class="sug-priority ${sug.priority}">${sug.priority}</span>
      </div>
      <div class="sug-explanation">${sug.explanation}</div>
      <button class="btn-apply-suggestion" data-suggestion='${JSON.stringify(sug)}'>Apply</button>
    </div>
  `).join('');

  // Add click handlers
  copilotDiv.querySelectorAll('.btn-apply-suggestion').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const suggestion = JSON.parse(e.target.dataset.suggestion);
      document.getElementById('promptText').value = suggestion.after;
      analyzePromptRealtime(suggestion.after);
      showToast('Suggestion applied!');
    });
  });

  document.getElementById('copilotPanel').style.display = 'block';
}

document.getElementById('closeCopilot')?.addEventListener('click', () => {
  document.getElementById('copilotPanel').style.display = 'none';
});

// ============================================================================
// MODEL ROUTER
// ============================================================================

function routeModel(promptText) {
  const taskType = document.getElementById('taskTypeSelect').value;
  const routing = ModelRouter.route(promptText, { taskType, priority: 'balanced' });

  document.getElementById('recommendedModel').textContent = routing.model;
  document.getElementById('modelRouterInfo').style.display = 'block';
}

document.getElementById('showModelOptions')?.addEventListener('click', () => {
  const promptText = document.getElementById('promptText').value;
  const costs = ModelRouter.compareCosts(promptText);

  const detailsDiv = document.getElementById('modelDetails');
  detailsDiv.innerHTML = '<table class="model-comparison"><thead><tr><th>Model</th><th>Cost</th><th>Quality</th><th>Speed</th></tr></thead><tbody>' +
    costs.slice(0, 5).map(c => `
      <tr>
        <td>${c.model}</td>
        <td>$${c.totalCost.toFixed(4)}</td>
        <td>${c.quality}/100</td>
        <td>${c.speed}</td>
      </tr>
    `).join('') + '</tbody></table>';

  detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
});

// ============================================================================
// IMPROVE, COMPRESS, SECURITY SCAN
// ============================================================================

document.getElementById('improvePrompt')?.addEventListener('click', async () => {
  const promptText = document.getElementById('promptText').value;
  const taskType = document.getElementById('taskTypeSelect').value;

  // Try AI improvement if API key available
  if (currentApiKeys.anthropic) {
    try {
      showToast('Improving with AI...', 'info');
      const improved = await PromptAssistant.improveWithAI(promptText, currentApiKeys.anthropic);
      document.getElementById('promptText').value = improved.improved;
      showToast('Improved! Changes: ' + improved.changes.join(', '));
      analyzePromptRealtime(improved.improved);
    } catch (error) {
      console.error('AI improvement failed:', error);
      // Fall back to rule-based
      applyRuleBasedImprovement(promptText, taskType);
    }
  } else {
    applyRuleBasedImprovement(promptText, taskType);
  }
});

function applyRuleBasedImprovement(promptText, taskType) {
  const improved = PromptAssistant.improvePrompt(promptText, {
    addRole: true,
    addChainOfThought: taskType === 'reasoning',
    addFormat: true,
    taskType
  });

  document.getElementById('promptText').value = improved;
  showToast('Improved with rule-based enhancements!');
  analyzePromptRealtime(improved);
}

document.getElementById('compressPrompt')?.addEventListener('click', () => {
  const promptText = document.getElementById('promptText').value;
  const compressed = PromptAssistant.compressPrompt(promptText);

  document.getElementById('promptText').value = compressed.compressed;
  showToast(`Compressed! Saved ${compressed.savingsPercent}% tokens (${compressed.savings} tokens)`);
  analyzePromptRealtime(compressed.compressed);
});

document.getElementById('scanSecurity')?.addEventListener('click', () => {
  const promptText = document.getElementById('promptText').value;
  const scan = SecurityScanner.scan(promptText);

  // Show modal
  document.getElementById('securityScore').innerHTML = `
    <h3 class="security-grade grade-${scan.grade.toLowerCase()}">${scan.grade}</h3>
    <p>Security Score: ${scan.score}/100</p>
    <p>${scan.recommendation}</p>
  `;

  if (scan.issues.length > 0) {
    document.getElementById('securityIssues').innerHTML = '<strong>🚨 Critical Issues:</strong>' +
      scan.issues.map(issue => `
        <div class="security-issue ${issue.severity}">
          <strong>${issue.type}:</strong> ${issue.message}
          <br><small>${issue.recommendation}</small>
        </div>
      `).join('');
    document.getElementById('sanitizePrompt').style.display = 'inline-block';
  } else {
    document.getElementById('securityIssues').innerHTML = '<p style="color: green;">✅ No critical issues found</p>';
    document.getElementById('sanitizePrompt').style.display = 'none';
  }

  if (scan.warnings.length > 0) {
    document.getElementById('securityWarnings').innerHTML = '<strong>⚠️ Warnings:</strong>' +
      scan.warnings.map(warn => `
        <div class="security-warning ${warn.severity}">
          <strong>${warn.type}:</strong> ${warn.message}
        </div>
      `).join('');
  } else {
    document.getElementById('securityWarnings').innerHTML = '';
  }

  openModal(document.getElementById('securityScanModal'));
});

document.getElementById('sanitizePrompt')?.addEventListener('click', () => {
  const promptText = document.getElementById('promptText').value;
  const sanitized = SecurityScanner.sanitize(promptText);

  document.getElementById('promptText').value = sanitized.sanitized;
  showToast(`Sanitized! Removed: ${sanitized.removedItems.join(', ')}`);
  analyzePromptRealtime(sanitized.sanitized);
  closeModal(document.getElementById('securityScanModal'));
});

document.getElementById('closeSecurityScan')?.addEventListener('click', () => {
  closeModal(document.getElementById('securityScanModal'));
});

// ============================================================================
// API SETTINGS
// ============================================================================

document.getElementById('apiSettingsBtn')?.addEventListener('click', async () => {
  // Load saved API keys
  const data = await chrome.storage.local.get(['apiKeys']);
  if (data.apiKeys) {
    currentApiKeys = data.apiKeys;
    document.getElementById('anthropicApiKey').value = currentApiKeys.anthropic || '';
    document.getElementById('openaiApiKey').value = currentApiKeys.openai || '';
  }
  openModal(document.getElementById('apiSettingsModal'));
});

document.getElementById('saveApiSettings')?.addEventListener('click', async () => {
  const anthropicKey = document.getElementById('anthropicApiKey').value.trim();
  const openaiKey = document.getElementById('openaiApiKey').value.trim();

  currentApiKeys = {
    anthropic: anthropicKey || null,
    openai: openaiKey || null
  };

  await chrome.storage.local.set({ apiKeys: currentApiKeys });

  const enabledFeatures = [];
  if (anthropicKey) enabledFeatures.push('Claude API');
  if (openaiKey) enabledFeatures.push('OpenAI API');

  showToast(enabledFeatures.length > 0
    ? `API keys saved! Enabled: ${enabledFeatures.join(', ')}`
    : 'API keys cleared'
  );

  closeModal(document.getElementById('apiSettingsModal'));
});

document.getElementById('cancelApiSettings')?.addEventListener('click', () => {
  closeModal(document.getElementById('apiSettingsModal'));
});

// ============================================================================
// CONVERSATION BRANCHES
// ============================================================================

document.getElementById('branchesBtn')?.addEventListener('click', async () => {
  await loadConversations();
  openModal(document.getElementById('branchesModal'));
});

document.getElementById('newConversation')?.addEventListener('click', async () => {
  const name = prompt('Conversation name:');
  if (!name) return;

  const convId = await ConversationBranches.createConversation(name);
  showToast('Conversation created!');
  await loadConversations();
});

document.getElementById('closeBranches')?.addEventListener('click', () => {
  closeModal(document.getElementById('branchesModal'));
});

async function loadConversations() {
  const data = await chrome.storage.local.get(['conversations']);
  const conversations = data.conversations || {};

  const list = document.getElementById('conversationsList');
  list.innerHTML = '';

  Object.values(conversations).forEach(conv => {
    const item = document.createElement('div');
    item.className = 'conversation-item';
    item.innerHTML = `
      <div class="conv-header">
        <strong>${conv.name}</strong>
        <span class="conv-date">${new Date(conv.createdAt).toLocaleDateString()}</span>
      </div>
      <div class="conv-stats">
        ${conv.branches.length} branches • ${Object.keys(conv.nodes).length} messages
      </div>
    `;
    item.onclick = () => viewConversation(conv.id);
    list.appendChild(item);
  });

  if (Object.keys(conversations).length === 0) {
    list.innerHTML = '<p style="text-align: center; color: #999;">No conversations yet. Create one to get started!</p>';
  }
}

async function viewConversation(convId) {
  // Use the visual tree viewer
  const vizDiv = document.getElementById('branchVisualization');
  vizDiv.style.display = 'block';
  ConversationTreeVisualizer.renderTree(convId, vizDiv);
}

// ============================================================================
// VERSION HISTORY (Add to prompt cards)
// ============================================================================

// This function will be called from popup.js when adding version history buttons
window.showPromptVersionHistory = async function(promptIndex, promptName) {
  await VersionDiff.showVersionHistory(promptIndex, promptName);
};

// ============================================================================
// INITIALIZE ON LOAD
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
  // Load API keys
  const data = await chrome.storage.local.get(['apiKeys']);
  if (data.apiKeys) {
    currentApiKeys = data.apiKeys;
  }

  // Add version history buttons to existing prompts
  addVersionHistoryButtons();
});

// Add version history buttons to prompt cards
function addVersionHistoryButtons() {
  // This will be called after prompts are loaded
  const observer = new MutationObserver(() => {
    const promptCards = document.querySelectorAll('.prompt-card');
    promptCards.forEach((card, index) => {
      if (!card.querySelector('.btn-version-history')) {
        const actionsDiv = card.querySelector('.prompt-actions');
        if (actionsDiv) {
          const versionBtn = document.createElement('button');
          versionBtn.className = 'btn-icon btn-version-history';
          versionBtn.title = 'Version History';
          versionBtn.innerHTML = '📜';
          versionBtn.onclick = (e) => {
            e.stopPropagation();
            const promptName = card.querySelector('h3').textContent;
            showPromptVersionHistory(index, promptName);
          };
          actionsDiv.insertBefore(versionBtn, actionsDiv.firstChild);
        }
      }
    });
  });

  observer.observe(document.getElementById('promptsList'), {
    childList: true,
    subtree: true
  });
}
