import { animate } from "motion";

class NoteCards extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="card"></div>
        `;

        const wrapStyles = `
        .card {
            display: grid;
            grid-template-columns: repeat(auto-fill, 300px);
            justify-content: center;
            margin: 50px;
            gap: 40px;
            list-style-type: none;
        }
        
        .card li {
            background-color: #535C91;
            position: relative;
            list-style: none;
            border-radius: 10px;
            padding: 25px 20px 25px;
            height: 250px;
            box-shadow: 6px 6px 2px rgb(7, 15, 43);
        }
        
        @media only screen and (max-width: 768px) {
            .card {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 25px;
                margin: 20px;
            }
        
            .card li {
                height: auto;
            }
        }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = wrapStyles;
        document.head.appendChild(styleElement);

        animate(
            ".card",
            { rotate: 0.5 },
            {
              duration: 2,
              easing: "ease-in-out",
              repeat: 5,
              direction: "alternate"
            }
          )
    }
}
customElements.define('note-cards', NoteCards);