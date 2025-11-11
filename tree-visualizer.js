// ============================================================================
// CONVERSATION TREE VISUALIZER - Interactive Visual Tree for Conversations
// ============================================================================

const ConversationTreeVisualizer = {
  // Render tree to SVG
  renderTree(convId, containerElement) {
    const tree = ConversationBranches.getTree(convId);
    if (!tree || !tree.tree) {
      containerElement.innerHTML = '<p>No conversation data</p>';
      return;
    }

    const container = containerElement;
    container.innerHTML = '';

    // Create SVG canvas
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'conversation-tree-svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '600');

    // Calculate tree layout
    const layout = this.calculateLayout(tree.tree, tree.conversation.branches);

    // Render connections first (so they're behind nodes)
    this.renderConnections(svg, layout);

    // Render nodes
    this.renderNodes(svg, layout, tree, convId);

    container.appendChild(svg);

    // Add legend
    this.renderLegend(container, tree.conversation.branches);

    // Add controls
    this.renderControls(container, convId, tree);
  },

  calculateLayout(rootNode, branches, xOffset = 50, yOffset = 30, level = 0) {
    const nodeWidth = 180;
    const nodeHeight = 60;
    const horizontalGap = 220;
    const verticalGap = 100;

    const layout = {
      id: rootNode.id,
      x: xOffset,
      y: yOffset + (level * verticalGap),
      width: nodeWidth,
      height: nodeHeight,
      node: rootNode,
      children: []
    };

    // Layout children
    if (rootNode.children && rootNode.children.length > 0) {
      let childX = xOffset;

      rootNode.children.forEach((child, index) => {
        const childLayout = this.calculateLayout(
          child,
          branches,
          childX,
          yOffset,
          level + 1
        );

        layout.children.push(childLayout);
        childX += horizontalGap;
      });

      // Center parent over children
      if (rootNode.children.length > 1) {
        const firstChildX = layout.children[0].x;
        const lastChildX = layout.children[layout.children.length - 1].x;
        layout.x = (firstChildX + lastChildX) / 2;
      }
    }

    return layout;
  },

  renderConnections(svg, layout) {
    const renderLines = (node) => {
      node.children.forEach(child => {
        // Draw line from parent to child
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', node.x + node.width / 2);
        line.setAttribute('y1', node.y + node.height);
        line.setAttribute('x2', child.x + child.width / 2);
        line.setAttribute('y2', child.y);
        line.setAttribute('stroke', '#4285f4');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('class', 'tree-connection');

        svg.appendChild(line);

        // Recurse
        renderLines(child);
      });
    };

    renderLines(layout);
  },

  renderNodes(svg, layout, tree, convId) {
    const renderNodeGroup = (node) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'tree-node-group');
      g.setAttribute('data-node-id', node.id);

      // Node background
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', node.x);
      rect.setAttribute('y', node.y);
      rect.setAttribute('width', node.width);
      rect.setAttribute('height', node.height);
      rect.setAttribute('rx', '8');
      rect.setAttribute('class', 'tree-node-rect');

      // Determine branch color
      const branch = tree.conversation.branches.find(b =>
        b.headNodeId === node.id || this.isNodeInBranch(node.id, b, tree)
      );
      if (branch) {
        rect.setAttribute('fill', branch.color || '#4285f4');
      } else {
        rect.setAttribute('fill', '#4285f4');
      }

      g.appendChild(rect);

      // Role indicator
      const roleIcon = node.node.role === 'user' ? '👤' : '🤖';
      const roleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      roleText.setAttribute('x', node.x + 10);
      roleText.setAttribute('y', node.y + 25);
      roleText.setAttribute('fill', 'white');
      roleText.setAttribute('font-size', '20');
      roleText.textContent = roleIcon;
      g.appendChild(roleText);

      // Content preview
      const contentText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      contentText.setAttribute('x', node.x + 40);
      contentText.setAttribute('y', node.y + 25);
      contentText.setAttribute('fill', 'white');
      contentText.setAttribute('font-size', '12');
      contentText.setAttribute('font-weight', '600');

      const preview = node.node.content.substring(0, 20) + (node.node.content.length > 20 ? '...' : '');
      contentText.textContent = preview;
      g.appendChild(contentText);

      // Timestamp
      const timeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      timeText.setAttribute('x', node.x + 10);
      timeText.setAttribute('y', node.y + 45);
      timeText.setAttribute('fill', 'rgba(255,255,255,0.8)');
      timeText.setAttribute('font-size', '10');
      timeText.textContent = new Date(node.node.timestamp).toLocaleTimeString();
      g.appendChild(timeText);

      // Children count badge if has children
      if (node.node.children && node.node.children.length > 1) {
        const badge = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        badge.setAttribute('cx', node.x + node.width - 15);
        badge.setAttribute('cy', node.y + 15);
        badge.setAttribute('r', '12');
        badge.setAttribute('fill', '#ea4335');
        g.appendChild(badge);

        const badgeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        badgeText.setAttribute('x', node.x + node.width - 15);
        badgeText.setAttribute('y', node.y + 20);
        badgeText.setAttribute('fill', 'white');
        badgeText.setAttribute('font-size', '10');
        badgeText.setAttribute('text-anchor', 'middle');
        badgeText.textContent = node.node.children.length;
        g.appendChild(badgeText);
      }

      // Make clickable
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => {
        this.onNodeClick(node, tree, convId);
      });

      g.addEventListener('mouseenter', () => {
        this.showNodeTooltip(node, g);
      });

      g.addEventListener('mouseleave', () => {
        this.hideNodeTooltip();
      });

      svg.appendChild(g);

      // Recurse for children
      node.children.forEach(child => renderNodeGroup(child));
    };

    renderNodeGroup(layout);
  },

  isNodeInBranch(nodeId, branch, tree) {
    // Walk backwards from branch head to see if we encounter this node
    let currentId = branch.headNodeId;
    while (currentId) {
      if (currentId === nodeId) return true;
      const node = tree.conversation.nodes?.[currentId];
      if (!node) break;
      currentId = node.parentId;
    }
    return false;
  },

  renderLegend(container, branches) {
    const legend = document.createElement('div');
    legend.className = 'tree-legend';
    legend.innerHTML = '<strong>Branches:</strong>';

    branches.forEach(branch => {
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = `
        <span class="legend-color" style="background: ${branch.color}"></span>
        <span class="legend-name">${branch.name}</span>
      `;
      legend.appendChild(item);
    });

    container.appendChild(legend);
  },

  renderControls(container, convId, tree) {
    const controls = document.createElement('div');
    controls.className = 'tree-controls';

    const zoomIn = document.createElement('button');
    zoomIn.textContent = '+';
    zoomIn.className = 'tree-control-btn';
    zoomIn.onclick = () => this.zoom(container, 1.2);

    const zoomOut = document.createElement('button');
    zoomOut.textContent = '-';
    zoomOut.className = 'tree-control-btn';
    zoomOut.onclick = () => this.zoom(container, 0.8);

    const reset = document.createElement('button');
    reset.textContent = 'Reset View';
    reset.className = 'tree-control-btn';
    reset.onclick = () => this.resetView(container);

    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export as PNG';
    exportBtn.className = 'tree-control-btn';
    exportBtn.onclick = () => this.exportAsPNG(container);

    controls.appendChild(zoomIn);
    controls.appendChild(zoomOut);
    controls.appendChild(reset);
    controls.appendChild(exportBtn);

    container.appendChild(controls);
  },

  currentScale: 1,

  zoom(container, factor) {
    this.currentScale *= factor;
    const svg = container.querySelector('.conversation-tree-svg');
    if (svg) {
      svg.style.transform = `scale(${this.currentScale})`;
      svg.style.transformOrigin = 'top left';
    }
  },

  resetView(container) {
    this.currentScale = 1;
    const svg = container.querySelector('.conversation-tree-svg');
    if (svg) {
      svg.style.transform = 'scale(1)';
    }
  },

  onNodeClick(node, tree, convId) {
    // Show node details modal
    const modal = document.createElement('div');
    modal.className = 'node-detail-modal';
    modal.innerHTML = `
      <div class="node-detail-content">
        <div class="node-detail-header">
          <h3>${node.node.role === 'user' ? '👤 User' : '🤖 Assistant'} Message</h3>
          <button class="close-node-detail">×</button>
        </div>
        <div class="node-detail-body">
          <p><strong>Timestamp:</strong> ${new Date(node.node.timestamp).toLocaleString()}</p>
          <p><strong>Content:</strong></p>
          <div class="node-content">${node.node.content}</div>
          ${node.node.children && node.node.children.length > 0 ? `
            <p><strong>Branches from here:</strong> ${node.node.children.length}</p>
          ` : ''}
        </div>
        <div class="node-detail-actions">
          <button class="btn-create-branch" data-node-id="${node.id}">Create Branch Here</button>
          <button class="btn-view-context">View Full Context</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close-node-detail').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    modal.querySelector('.btn-create-branch').onclick = async () => {
      const branchName = prompt('Branch name:');
      if (branchName) {
        await ConversationBranches.createBranch(convId, branchName, node.id);
        showToast('Branch created!');
        modal.remove();
        this.renderTree(convId, document.getElementById('branchVisualization'));
      }
    };
  },

  showNodeTooltip(node, element) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tree-node-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.left = (node.x + node.width + 10) + 'px';
    tooltip.style.top = node.y + 'px';
    tooltip.innerHTML = `
      <strong>${node.node.role}</strong><br>
      ${node.node.content.substring(0, 100)}${node.node.content.length > 100 ? '...' : ''}
    `;
    tooltip.id = 'active-tooltip';

    element.closest('svg').parentElement.appendChild(tooltip);
  },

  hideNodeTooltip() {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) tooltip.remove();
  },

  exportAsPNG(container) {
    // Simple export - in real implementation would use svg-to-png library
    showToast('Export feature - would convert SVG to PNG', 'info');
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ConversationTreeVisualizer };
}
