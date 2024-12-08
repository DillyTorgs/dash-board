import { LitElement, html, css } from 'lit';

export class HaxFilterSidebar extends LitElement {
  static properties = {
    availableTags: { type: Array },
    activeFilters: { type: Array }
  };

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .sidebar {
      background: white;
      padding: 1rem;
      border-right: 1px solid #eee;
      height: 100%;
    }

    .filter-title {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .filter-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filter-item {
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .filter-item:hover {
      background: #f5f5f5;
    }

    .filter-item.active {
      background: #e6f0ff;
      color: #0066cc;
    }
  `;

  handleFilterClick(tag) {
    this.dispatchEvent(new CustomEvent('toggle-filter', { detail: tag }));
  }

  render() {
    return html`
      <div class="sidebar">
        <h2 class="filter-title">Filters</h2>
        <div class="filter-list">
          ${this.availableTags.map(tag => html`
            <div 
              class="filter-item ${this.activeFilters?.includes(tag) ? 'active' : ''}"
              @click=${() => this.handleFilterClick(tag)}
            >
              ${tag}
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('hax-filter-sidebar', HaxFilterSidebar);