import { LitElement, html, css } from "lit";

export class BotonNumero extends LitElement {

  static properties = {
    value: { type: String }
  };

  constructor() {
    super();
    this.value = "0";
  }

  static styles = css`
    button {
      width: 100%;
      height: 60px;
      font-size: 1.4rem;
    }
  `;

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      />

      <button class="btn btn-warning" @click=${this.handleClick}>
        ${this.value}
      </button>
    `;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent("numero-click", {
      detail: this.value
    }));
  }
}

customElements.define("boton-numero", BotonNumero);
