import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

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
      background-color: var(--ddd-theme-default-background);
      padding: 1rem;
      border-right: 1px solid var(--ddd-theme-default-potential0);;
      height: 100%;
    }

    .filter-title {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: var(--ddd-theme-default-potentialMidnight);
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
      background: var(--ddd-theme-default-potential0);
    }

    .filter-item.active {
      background: var(--ddd-theme-default-potential0);
      color: var(--ddd-theme-default-navy80)
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
