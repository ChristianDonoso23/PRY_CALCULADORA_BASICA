import { LitElement, html, css } from "lit";
import "./botonNumero.js";
import "./botonOperacion.js";

export class Calculadora extends LitElement {

  static properties = {
    expresion: { type: String },
    mostrarResultado: { type: Boolean }
  };

  constructor() {
    super();
    this.expresion = "";
    this.mostrarResultado = false;
  }

  static styles = css`
    .display {
      height: 60px;
      font-size: 1.6rem;
      text-align: right;
      padding: .5rem 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      width: 100%;
      border: none;
    }

    boton-numero, boton-operacion {
      display: block;
    }

    .btn-equals {
      height: 60px;
      font-size: 1.4rem;
    }

    .btn-ac {
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

      <div class="card bg-dark text-white p-3">
        <input class="display mb-3" .value=${this.expresion || "0"} disabled>

        <div class="container">

          <!-- FILA 1 -->
          <div class="row g-2">
            <div class="col-sm-3"><boton-numero value="1" @numero-click=${this.insertar}></boton-numero></div>
            <div class="col-sm-3"><boton-numero value="2" @numero-click=${this.insertar}></boton-numero></div>
            <div class="col-sm-3"><boton-numero value="3" @numero-click=${this.insertar}></boton-numero></div>
            <div class="col-sm-3"><boton-operacion op="+" @operacion-click=${this.agregarOperacion}></boton-operacion></div>
          </div>

          <!-- FILA 2 -->
          <div class="row g-2 mt-1">
            <div class="col-sm-3"><boton-numero value="4" @numero-click=${this.insertar}></boton-numero></div>
            <div class="col-sm-3"><boton-numero value="5" @numero-click=${this.insertar}></boton-numero></div>
            <div class="col-sm-3"><boton-numero value="6" @numero-click=${this.insertar}></boton-numero></div>
            <div class="col-sm-3"><boton-operacion op="-" @operacion-click=${this.agregarOperacion}></boton-operacion></div>
          </div>

          <!-- FILA 3 -->
          <div class="row g-2 mt-1">
            <div class="col-sm-3"><boton-numero value="7" @numero-click=${this.insertar}></boton-numero></div>
            <div class="col-sm-3"><boton-numero value="8" @numero-click=${this.insertar}></boton-numero></div>
            <div class="col-sm-3"><boton-numero value="9" @numero-click=${this.insertar}></boton-numero></div>
            <div class="col-sm-3"><boton-operacion op="*" @operacion-click=${this.agregarOperacion}></boton-operacion></div>
          </div>

          <!-- FILA 4 -->
          <div class="row g-2 mt-1">
          <div class="col-sm-3">
            <boton-numero value="0" @numero-click=${this.insertar}></boton-numero>
          </div>

          <div class="col-sm-3">
            <boton-numero value="." @numero-click=${this.insertar}></boton-numero>
          </div>

          <div class="col-sm-3">
            <button class="btn btn-danger btn-ac w-100" @click=${this.clear}>AC</button>
          </div>

          <div class="col-sm-3">
            <boton-operacion op="/" @operacion-click=${this.agregarOperacion}></boton-operacion>
          </div>
        </div>


          <!-- FILA 5 -->
          <div class="row g-2 mt-1">
            <div class="col-sm-12">
              <button class="btn btn-success w-100 btn-equals" @click=${this.calcular}>
                =
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  insertar(e) {
    const val = e.detail;

    // evitar doble punto en un mismo número
    const partes = this.expresion.split(/[\+\-\*\/]/);
    const ultimo = partes[partes.length - 1];

    if (val === "." && ultimo.includes(".")) return;

    this.expresion = this.mostrarResultado ? val : this.expresion + val;
    this.mostrarResultado = false;
  }

  agregarOperacion(e) {
    const op = e.detail;

    // evitar dos operadores seguidos: "5+-" → solo queda "-"
    if ("+-*/".includes(this.expresion.slice(-1))) {
      this.expresion = this.expresion.slice(0, -1) + op;
    } else {
      this.expresion += op;
    }

    this.mostrarResultado = false;
  }

  clear() {
    this.expresion = "";
    this.mostrarResultado = false;
  }

  calcular() {
    try {
      this.expresion = String(Function(`return ${this.expresion}`)());
      this.mostrarResultado = true;
    } catch {
      this.expresion = "Error";
      this.mostrarResultado = true;
    }
  }
}

customElements.define("basic-calculator", Calculadora);
