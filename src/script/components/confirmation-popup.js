class ConfirmationPopup extends HTMLElement {
    static get observedAttributes() {
        return ['visible', 'note-id', 'note-title'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'visible') {
            if (newValue === 'true') {
                this.style.display = 'block';
            } else {
                this.style.display = 'none';
            }
        }
        if (name === 'note-title') {
            const deleteTitle = this.querySelector('#deleteTitle');
            deleteTitle.textContent = newValue;
        }
    }

    async deleteNote() {
        const noteId = this.getAttribute('note-id');
        try {
            const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                this.dispatchEvent(new CustomEvent('note-deleted', { detail: { status: data.status } }));
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            this.dispatchEvent(new CustomEvent('delete-error', { detail: { message: error.message } }));
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete note',
            });
        }
    }

    render() {
        this.innerHTML = `
            <div class="deleteNotesConfirmation">
                <div class="deleteNoteContent">
                    <p>Anda yakin ingin menghapus catatan yang berjudul "<span id="deleteTitle"></span>"?</p>
                    <div class="buttonContainer">
                        <button id="confirmDeleteButton">Hapus</button>
                        <button id="cancelDeleteButton">Batal</button>
                    </div>
                </div>
            </div>
      `;

        const noteCardStyles = `    
            .deleteNotesConfirmation {
                position: fixed;
                display: none;
                z-index: 1000;
                padding: 30px;
                background-color: white;
                border-radius: 5px;
                box-shadow: 12px 12px 10px rgb(22, 26, 48);
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            
            .deleteNotesConfirmation > .deleteNoteContent > .buttonContainer {
                margin: 10px;
                cursor: pointer;
            }
            
            #confirmDeleteButton {
                padding: 10px 20px;
                border-radius: 5px;
                background-color: darkred;
                border: 0px solid darkred;
                color: white;
                cursor: pointer;
            }
            
            #confirmDeleteButton:hover {
                background-color: red;
                color: white;
            }
            
            #cancelDeleteButton {
                padding: 10px 20px;
                border-radius: 5px;
                background-color: white;
                color: #3E3232;
                border: 1px solid #3E3232;
                cursor: pointer;
            }
            
            #cancelDeleteButton:hover {
                background-color: #3E3232;
                color: white;
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.textContent = noteCardStyles;
        this.appendChild(styleElement);

        this.querySelector('#confirmDeleteButton').addEventListener('click', async () => {
            await this.deleteNote();
        });

        this.querySelector('#cancelDeleteButton').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('cancel-delete'));
        });
    }
}
customElements.define('confirmation-popup', ConfirmationPopup);
