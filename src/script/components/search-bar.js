class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .searchSection {
                    display: flex;
                    flex-direction: column;
                    margin: 30px;
                    padding: 20px;
                    width: 950px;
                    align-items: center;
                    border: 1px solid black;
                    border-radius: 10px;
                    background-color: #535C91;
                    box-shadow: 20px 18px 10px rgb(7, 15, 43);
                }
                
                .searchSection > h2 {
                    color: white;
                }
                
                .searchSection > div {
                    padding: 16px;
                    width: 100%;
                    display: grid;
                    grid-template-columns: auto 1fr 0.5fr;
                    grid-gap: 20px;
                }
                
                .searchSection > div > label {
                    display: flex;
                    align-items: center;
                    color: white;
                }
                
                .searchSection > div > input {
                    padding: 5px;
                    border-radius: 5px;
                    height: 25px;
                }
                
                .searchSection > div > button {
                    background-color: #070F2B;
                    color: white;
                    border: 0;
                    border-radius: 5px;
                    cursor: pointer;
                    height: 40px;
                }

                @media only screen and (max-width: 768px) {
                    .searchSection {
                        margin: 20px;
                        width: 800px;
                    }
                }

                @media only screen and (max-width: 576px) {
                    .searchSection {
                        margin: 20px;
                        padding: 20px;
                        width: 500px;
                    }

                    .searchSection > div {
                        grid-template-columns: auto;
                    }
                }

                @media only screen and (max-width: 320px) {
                    .searchSection {
                        margin: 20px;
                        padding: 15px;
                        width: 225px;
                    }

                    .searchSection > div {
                        grid-template-columns: auto;
                    }
                }
                
                .searchSection .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                }
            </style>
            
            <div class="searchSection">
                <h2>Cari Catatan <span class="material-symbols-outlined">search</span></h2>
                <div id="searchBook">
                    <label for="searchKeyword">Masukan Judul / Kata Kunci</label>
                    <input id="searchKeyword" type="text">
                    <button id="searchSubmit" type="submit">Cari</button>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('searchSubmit').addEventListener('click', () => {
            const searchTerm = this.shadowRoot.getElementById('searchKeyword').value;
            console.log('Kata kunci yang dimasukan :', searchTerm);
        });
    }
}
customElements.define('search-bar', SearchBar);