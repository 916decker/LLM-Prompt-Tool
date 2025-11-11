// ============================================================================
// VERSION DIFF TOOL - Visual Diff for Prompt History
// ============================================================================

const VersionDiff = {
  // Calculate diff between two strings
  calculateDiff(oldText, newText) {
    const oldLines = oldText.split('\n');
    const newLines = newText.split('\n');

    const diff = [];
    let i = 0, j = 0;

    while (i < oldLines.length || j < newLines.length) {
      if (i >= oldLines.length) {
        // Only new lines left
        diff.push({ type: 'add', content: newLines[j], lineNum: j + 1 });
        j++;
      } else if (j >= newLines.length) {
        // Only old lines left
        diff.push({ type: 'remove', content: oldLines[i], lineNum: i + 1 });
        i++;
      } else if (oldLines[i] === newLines[j]) {
        // Lines match
        diff.push({ type: 'equal', content: oldLines[i], lineNum: i + 1 });
        i++;
        j++;
      } else {
        // Lines differ - check if it's a modification or add/remove
        const oldInNew = newLines.slice(j).indexOf(oldLines[i]);
        const newInOld = oldLines.slice(i).indexOf(newLines[j]);

        if (oldInNew !== -1 && (newInOld === -1 || oldInNew <= newInOld)) {
          // Old line appears later in new - this is an addition
          diff.push({ type: 'add', content: newLines[j], lineNum: j + 1 });
          j++;
        } else if (newInOld !== -1) {
          // New line appears later in old - this is a removal
          diff.push({ type: 'remove', content: oldLines[i], lineNum: i + 1 });
          i++;
        } else {
          // Lines are genuinely different - show as modification
          diff.push({
            type: 'modify',
            oldContent: oldLines[i],
            newContent: newLines[j],
            lineNum: i + 1
          });
          i++;
          j++;
        }
      }
    }

    return diff;
  },

  // Word-level diff for modified lines
  calculateWordDiff(oldText, newText) {
    const oldWords = oldText.split(/(\s+)/);
    const newWords = newText.split(/(\s+)/);

    const diff = [];
    let i = 0, j = 0;

    while (i < oldWords.length || j < newWords.length) {
      if (i >= oldWords.length) {
        diff.push({ type: 'add', word: newWords[j] });
        j++;
      } else if (j >= newWords.length) {
        diff.push({ type: 'remove', word: oldWords[i] });
        i++;
      } else if (oldWords[i] === newWords[j]) {
        diff.push({ type: 'equal', word: oldWords[i] });
        i++;
        j++;
      } else {
        // Different words
        diff.push({ type: 'remove', word: oldWords[i] });
        diff.push({ type: 'add', word: newWords[j] });
        i++;
        j++;
      }
    }

    return diff;
  },

  // Render side-by-side diff
  renderSideBySide(oldText, newText, container, metadata = {}) {
    const diff = this.calculateDiff(oldText, newText);

    container.innerHTML = '';

    // Header with metadata
    if (metadata.oldVersion || metadata.newVersion) {
      const header = document.createElement('div');
      header.className = 'diff-header';
      header.innerHTML = `
        <div class="diff-version-info">
          <div class="diff-old-version">
            <strong>Version ${metadata.oldVersion?.version || 'Old'}</strong>
            ${metadata.oldVersion?.timestamp ? `<span class="diff-timestamp">${new Date(metadata.oldVersion.timestamp).toLocaleString()}</span>` : ''}
            ${metadata.oldVersion?.effectiveness ? `<span class="diff-effectiveness">Score: ${metadata.oldVersion.effectiveness}%</span>` : ''}
          </div>
          <div class="diff-arrow">→</div>
          <div class="diff-new-version">
            <strong>Version ${metadata.newVersion?.version || 'New'}</strong>
            ${metadata.newVersion?.timestamp ? `<span class="diff-timestamp">${new Date(metadata.newVersion.timestamp).toLocaleString()}</span>` : ''}
            ${metadata.newVersion?.effectiveness ? `<span class="diff-effectiveness">Score: ${metadata.newVersion.effectiveness}%</span>` : ''}
          </div>
        </div>
      `;
      container.appendChild(header);
    }

    // Diff stats
    const stats = this.calculateStats(diff);
    const statsDiv = document.createElement('div');
    statsDiv.className = 'diff-stats';
    statsDiv.innerHTML = `
      <span class="stat-add">+${stats.additions} additions</span>
      <span class="stat-remove">-${stats.deletions} deletions</span>
      <span class="stat-modify">~${stats.modifications} modifications</span>
    `;
    container.appendChild(statsDiv);

    // Side-by-side view
    const diffContainer = document.createElement('div');
    diffContainer.className = 'diff-container-side-by-side';

    const oldSide = document.createElement('div');
    oldSide.className = 'diff-side diff-old';
    oldSide.innerHTML = '<div class="diff-side-label">Before</div>';

    const newSide = document.createElement('div');
    newSide.className = 'diff-side diff-new';
    newSide.innerHTML = '<div class="diff-side-label">After</div>';

    diff.forEach(line => {
      if (line.type === 'equal') {
        const oldLine = this.createDiffLine(line.content, 'equal', line.lineNum);
        const newLine = this.createDiffLine(line.content, 'equal', line.lineNum);
        oldSide.appendChild(oldLine);
        newSide.appendChild(newLine);
      } else if (line.type === 'remove') {
        const oldLine = this.createDiffLine(line.content, 'remove', line.lineNum);
        const newLine = this.createDiffLine('', 'empty', '');
        oldSide.appendChild(oldLine);
        newSide.appendChild(newLine);
      } else if (line.type === 'add') {
        const oldLine = this.createDiffLine('', 'empty', '');
        const newLine = this.createDiffLine(line.content, 'add', line.lineNum);
        oldSide.appendChild(oldLine);
        newSide.appendChild(newLine);
      } else if (line.type === 'modify') {
        const wordDiff = this.calculateWordDiff(line.oldContent, line.newContent);

        const oldLine = this.createDiffLineWithWords(wordDiff, 'old', line.lineNum);
        const newLine = this.createDiffLineWithWords(wordDiff, 'new', line.lineNum);

        oldSide.appendChild(oldLine);
        newSide.appendChild(newLine);
      }
    });

    diffContainer.appendChild(oldSide);
    diffContainer.appendChild(newSide);
    container.appendChild(diffContainer);

    // Actions
    if (metadata.onRevert) {
      const actions = document.createElement('div');
      actions.className = 'diff-actions';
      actions.innerHTML = `
        <button class="btn-revert-version btn-secondary">← Revert to Old Version</button>
        <button class="btn-copy-old btn-secondary">Copy Old</button>
        <button class="btn-copy-new btn-primary">Copy New</button>
      `;

      actions.querySelector('.btn-revert-version').onclick = () => metadata.onRevert(oldText);
      actions.querySelector('.btn-copy-old').onclick = () => {
        navigator.clipboard.writeText(oldText);
        showToast('Old version copied!');
      };
      actions.querySelector('.btn-copy-new').onclick = () => {
        navigator.clipboard.writeText(newText);
        showToast('New version copied!');
      };

      container.appendChild(actions);
    }
  },

  createDiffLine(content, type, lineNum) {
    const line = document.createElement('div');
    line.className = `diff-line diff-line-${type}`;

    if (type !== 'empty') {
      const lineNumber = document.createElement('span');
      lineNumber.className = 'diff-line-number';
      lineNumber.textContent = lineNum;
      line.appendChild(lineNumber);

      const lineContent = document.createElement('span');
      lineContent.className = 'diff-line-content';
      lineContent.textContent = content || ' ';
      line.appendChild(lineContent);
    }

    return line;
  },

  createDiffLineWithWords(wordDiff, side, lineNum) {
    const line = document.createElement('div');
    line.className = `diff-line diff-line-modify`;

    const lineNumber = document.createElement('span');
    lineNumber.className = 'diff-line-number';
    lineNumber.textContent = lineNum;
    line.appendChild(lineNumber);

    const lineContent = document.createElement('span');
    lineContent.className = 'diff-line-content';

    wordDiff.forEach(item => {
      if (side === 'old' && item.type === 'add') {
        // Don't show additions in old side
        return;
      }
      if (side === 'new' && item.type === 'remove') {
        // Don't show removals in new side
        return;
      }

      const span = document.createElement('span');
      span.className = `diff-word diff-word-${item.type}`;
      span.textContent = item.word;
      lineContent.appendChild(span);
    });

    line.appendChild(lineContent);
    return line;
  },

  calculateStats(diff) {
    return {
      additions: diff.filter(d => d.type === 'add').length,
      deletions: diff.filter(d => d.type === 'remove').length,
      modifications: diff.filter(d => d.type === 'modify').length,
      unchanged: diff.filter(d => d.type === 'equal').length
    };
  },

  // Unified diff view (like git diff)
  renderUnified(oldText, newText, container) {
    const diff = this.calculateDiff(oldText, newText);

    container.innerHTML = '';
    container.className = 'diff-container-unified';

    diff.forEach(line => {
      const lineDiv = document.createElement('div');

      if (line.type === 'equal') {
        lineDiv.className = 'diff-line-unified diff-line-equal';
        lineDiv.textContent = ' ' + line.content;
      } else if (line.type === 'remove') {
        lineDiv.className = 'diff-line-unified diff-line-remove';
        lineDiv.textContent = '-' + line.content;
      } else if (line.type === 'add') {
        lineDiv.className = 'diff-line-unified diff-line-add';
        lineDiv.textContent = '+' + line.content;
      } else if (line.type === 'modify') {
        const removeLine = document.createElement('div');
        removeLine.className = 'diff-line-unified diff-line-remove';
        removeLine.textContent = '-' + line.oldContent;
        container.appendChild(removeLine);

        const addLine = document.createElement('div');
        addLine.className = 'diff-line-unified diff-line-add';
        addLine.textContent = '+' + line.newContent;
        lineDiv = addLine;
      }

      container.appendChild(lineDiv);
    });
  },

  // Get version history for a prompt
  async getVersionHistory(promptIndex) {
    const data = await chrome.storage.local.get(['prompts']);
    const prompts = data.prompts || [];
    const prompt = prompts[promptIndex];

    if (!prompt || !prompt.history) {
      return [];
    }

    // Build version list
    const versions = prompt.history.map((entry, index) => ({
      version: index + 1,
      text: entry.text,
      timestamp: entry.timestamp,
      effectiveness: entry.effectivenessScore,
      usageCount: entry.usageCount || 0
    }));

    // Add current version
    versions.push({
      version: versions.length + 1,
      text: prompt.text,
      timestamp: prompt.lastModified || Date.now(),
      effectiveness: prompt.effectivenessScore,
      usageCount: prompt.usageCount || 0,
      current: true
    });

    return versions;
  },

  // Show version history modal
  async showVersionHistory(promptIndex, promptName) {
    const versions = await this.getVersionHistory(promptIndex);

    if (versions.length <= 1) {
      showToast('No version history available', 'info');
      return;
    }

    const modal = document.createElement('div');
    modal.className = 'version-history-modal';
    modal.innerHTML = `
      <div class="version-history-content">
        <div class="version-history-header">
          <h2>📜 Version History: ${promptName}</h2>
          <button class="close-version-history">×</button>
        </div>
        <div class="version-history-body">
          <div class="version-list">
            ${versions.map(v => `
              <div class="version-item ${v.current ? 'current-version' : ''}" data-version="${v.version}">
                <div class="version-header">
                  <strong>Version ${v.version}${v.current ? ' (Current)' : ''}</strong>
                  <span class="version-date">${new Date(v.timestamp).toLocaleString()}</span>
                </div>
                <div class="version-stats">
                  ${v.effectiveness ? `<span class="version-effectiveness">Score: ${Math.round(v.effectiveness)}%</span>` : ''}
                  <span class="version-usage">${v.usageCount} uses</span>
                </div>
                <div class="version-preview">${v.text.substring(0, 100)}...</div>
                <div class="version-actions">
                  <button class="btn-view-version" data-version="${v.version}">View</button>
                  ${!v.current ? `<button class="btn-compare-version" data-version="${v.version}">Compare to Current</button>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
          <div class="version-diff-container" id="versionDiffContainer"></div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close-version-history').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    // Add event listeners
    modal.querySelectorAll('.btn-compare-version').forEach(btn => {
      btn.onclick = () => {
        const versionNum = parseInt(btn.dataset.version);
        const oldVersion = versions.find(v => v.version === versionNum);
        const currentVersion = versions.find(v => v.current);

        const diffContainer = document.getElementById('versionDiffContainer');
        diffContainer.style.display = 'block';

        this.renderSideBySide(
          oldVersion.text,
          currentVersion.text,
          diffContainer,
          {
            oldVersion,
            newVersion: currentVersion,
            onRevert: async (oldText) => {
              if (confirm('Revert to this version?')) {
                await this.revertToVersion(promptIndex, oldText);
                showToast('Reverted to previous version!');
                modal.remove();
              }
            }
          }
        );
      };
    });

    modal.querySelectorAll('.btn-view-version').forEach(btn => {
      btn.onclick = () => {
        const versionNum = parseInt(btn.dataset.version);
        const version = versions.find(v => v.version === versionNum);

        const viewModal = document.createElement('div');
        viewModal.className = 'version-view-modal';
        viewModal.innerHTML = `
          <div class="version-view-content">
            <h3>Version ${version.version}</h3>
            <pre class="version-full-text">${version.text}</pre>
            <button class="btn-close-view">Close</button>
          </div>
        `;
        document.body.appendChild(viewModal);

        viewModal.querySelector('.btn-close-view').onclick = () => viewModal.remove();
      };
    });
  },

  async revertToVersion(promptIndex, oldText) {
    const data = await chrome.storage.local.get(['prompts']);
    const prompts = data.prompts || [];

    if (prompts[promptIndex]) {
      // Save current to history before reverting
      if (!prompts[promptIndex].history) {
        prompts[promptIndex].history = [];
      }

      prompts[promptIndex].history.push({
        text: prompts[promptIndex].text,
        timestamp: Date.now(),
        effectivenessScore: prompts[promptIndex].effectivenessScore,
        usageCount: prompts[promptIndex].usageCount
      });

      // Revert
      prompts[promptIndex].text = oldText;
      prompts[promptIndex].lastModified = Date.now();

      await chrome.storage.local.set({ prompts });
    }
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VersionDiff };
}
