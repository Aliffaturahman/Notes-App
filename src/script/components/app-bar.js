class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
            display: block;
            width: 100%;
          
            color: white;
            background-color: #070F2B;
            box-shadow: 0 8px 4px 0 rgba(0, 0, 0, 0.5);
        }
  
        div {
            padding: 24px 20px;
        }
  
        .brandName {
            margin: 0;
            font-size: 1.7em;
        }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `      
        <div>
            <h1 class="brandName">My Notes App</h1>
        </div>
        `;
    }
}
customElements.define('app-bar', AppBar);