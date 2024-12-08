import { LitElement, html, css } from 'lit';
import './components/hax-use-case-card.js';
import './components/hax-filter-sidebar.js';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";



export class HaxUseCaseApp extends LitElement {
  static properties = {
    useCases: { type: Array },
    activeFilters: { type: Array },
    selectedUseCase: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #f5f5f5;
    }

    .header {
      background: #333;
      color: white;
      padding: 1rem;
    }

    .header h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    .main-content {
      display: grid;
      grid-template-columns: 250px 1fr;
      height: calc(100vh - 64px);
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

    .cards-container {
      padding: 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      overflow-y: auto;
    }
  `;

  constructor() {
    super();
    this.useCases = USE_CASES;
    this.activeFilters = [];
    this.selectedUseCase = null;
  }

  getAvailableTags() {
    const tags = new Set();
    this.useCases.forEach(useCase => {
      useCase.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }

  getFilteredUseCases() {
    if (this.activeFilters.length === 0) return this.useCases;
    return this.useCases.filter(useCase => 
      useCase.tags.some(tag => this.activeFilters.includes(tag))
    );
  }

  handleFilterToggle(tag) {
    this.activeFilters = this.activeFilters.includes(tag)
      ? this.activeFilters.filter(t => t !== tag)
      : [...this.activeFilters, tag];
  }

  handleUseCaseSelect(e) {
    this.selectedUseCase = e.detail;
  }

  render() {
    const availableTags = this.getAvailableTags();
    const filteredUseCases = this.getFilteredUseCases();

    return html`
      <div class="header">
        <h1>HAX Use Cases</h1>
      </div>

      <div class="main-content">
        <div class="sidebar">
          <h2 class="filter-title">Filters</h2>
          <div class="filter-list">
            ${availableTags.map(tag => html`
              <div 
                class="filter-item ${this.activeFilters?.includes(tag) ? 'active' : ''}"
                @click=${() => this.handleFilterToggle(tag)}
              >
                ${tag}
              </div>
            `)}
          </div>
        </div>

        <div class="cards-container">
          ${filteredUseCases.map(useCase => html`
            <hax-use-case-card
              .useCase=${useCase}
              ?selected=${this.selectedUseCase === useCase.id}
              @select-use-case=${this.handleUseCaseSelect}
            ></hax-use-case-card>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('hax-use-case-app', HaxUseCaseApp);
