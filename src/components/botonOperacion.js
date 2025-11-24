import { LitElement, html, css } from "lit";

export class BotonOperacion extends LitElement {

  static properties = {
    op: { type: String }
  };

  constructor() {
    super();
    this.op = "+";
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

      <button class="btn btn-light" @click=${this.handleClick}>
        ${this.op}
      </button>
    `;
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent("operacion-click", {
      detail: this.op
    }));
  }
}

customElements.define("boton-operacion", BotonOperacion);
