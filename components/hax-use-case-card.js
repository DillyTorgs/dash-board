import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class HaxUseCaseCard extends LitElement {
  static properties = {
    useCase: { type: Object },
    selected: { type: Boolean }
  };

  static styles = css`
    .card {
      background: white;
      border-radius: 8px;
      border: 1px solid var(--ddd-theme-default-potential0);
      padding: 1rem;
      height: 100%;
    }

    .card.selected {
      border-color: var(--ddd-theme-default-navy80);
    }

    .card-title {
      font-size: 1.25rem;
      margin: 0 0 1rem 0;
    }

    .card-description {
      color: var(--ddd-theme-default-potential50);
      margin-bottom: 1rem;
    }

    .select-button {
      padding: 0.5rem 1rem;
      background: var(--ddd-theme-default-navy80);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  render() {
    const { id, title, description } = this.useCase;
    return html`
      <div class="card ${this.selected ? 'selected' : ''}">
        <h3 class="card-title">${title}</h3>
        <p class="card-description">${description}</p>
        <button 
          class="select-button"
          @click=${() => this.dispatchEvent(new CustomEvent('select-use-case', { detail: id }))}
        >
          ${this.selected ? 'Selected' : 'Select'}
        </button>
      </div>
    `;
  }
}

customElements.define('hax-use-case-card', HaxUseCaseCard);
