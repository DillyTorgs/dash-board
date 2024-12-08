import { LitElement, html, css } from 'lit';
import './components/hax-use-case-card.js';
import './components/hax-filter-sidebar.js';
import { getAvailableTags, getFilteredUseCases, loadUseCases } from './utils/useCaseUtils.js';

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
    this.useCases = [];
    this.activeFilters = [];
    this.selectedUseCase = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
  }

  async loadData() {
    this.useCases = await loadUseCases();
  }

  handleFilterToggle(e) {
    const tag = e.detail;
    this.activeFilters = this.activeFilters.includes(tag)
      ? this.activeFilters.filter(t => t !== tag)
      : [...this.activeFilters, tag];
  }

  handleUseCaseSelect(e) {
    this.selectedUseCase = e.detail;
  }

  render() {
    const filteredUseCases = getFilteredUseCases(this.useCases, this.activeFilters);
    const availableTags = getAvailableTags(this.useCases);

    return html`
      <div class="header">
        <h1>HAX Use Cases</h1>
      </div>

      <div class="main-content">
        <hax-filter-sidebar
          .availableTags=${availableTags}
          .activeFilters=${this.activeFilters}
          @toggle-filter=${this.handleFilterToggle}
        ></hax-filter-sidebar>

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