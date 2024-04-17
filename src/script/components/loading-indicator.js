class LoadingIndicator extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `
      <style>
        /* CSS untuk loading indicator */
        :host {
          display: none; /* Awalnya disembunyikan */
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.8); /* Transparan putih sebagai latar belakang */
          z-index: 9999; /* Pastikan muncul di atas elemen lain */
        }

        :host::before {
          content: ''; /* Untuk menunjukkan loading indicator */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          border: 5px solid #3498db; /* Warna biru sebagai indikator */
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s linear infinite; /* Animasi putar */
        }

        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      </style>
    `
  }

  show() {
    this.style.display = "block"
  }

  hide() {
    this.style.display = "none"
  }
}

customElements.define("loading-indicator", LoadingIndicator)
