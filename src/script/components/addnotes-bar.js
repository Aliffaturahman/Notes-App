import { animate } from "motion";

class AddNotes extends HTMLElement {
  connectedCallback() {
    this.renderForm()
    this.attachStyles()
    this.setupFormSubmission()
  }

  renderForm() {
    const addNotesBar = document.createElement('div')
    addNotesBar.classList.add('addnotes-bar')
    addNotesBar.innerHTML = `
      <h2>Tambahkan Catatan Baru</h2>
      <form id="inputNotesForm" class="inputNotes">
        <div class="input">
          <label for="title">Judul</label>
          <input type="text" id="title" name="title" required>
          <span id="errorTitle" class="error"></span>
        </div>
        <div class="input">
          <label for="description">Deskripsi Catatan</label>
          <textarea id="description" name="description" required></textarea>
          <span id="errorDescription" class="error"></span>
        </div>
        <button type="submit" id="addNote">Tambah Catatan</button>
      </form>
    `
    this.appendChild(addNotesBar)
  }

  attachStyles() {
    const noteCardStyles = `    
      .addnotes-bar {
        margin: 30px auto;
        padding: 20px;
        max-width: 982px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: #535C91;
        box-shadow: 20px 18px 10px rgb(7, 15, 43);
      }

      h2 {
        text-align: center;
        color: white;
      }

      form {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: #535C91;
        border-radius: 8px;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
      }

      .inputNotes {
        padding: 20px;
      }
      
      .input {
        margin-bottom: 30px;
      }
      
      .input label {
        display: block;
        margin-bottom: 5px;
        color: white;
      }
      
      .input input,
      .input textarea {
        padding: 10px;
        width: 100%;
        border: 1px solid black;
        border-radius: 5px;
        box-sizing: border-box;
      }
      
      #addNote {
        background-color: #070F2B;
        color: white;
        padding: 10px 30px;
        border: none;
        border-radius: 7px;
        cursor: pointer;
      }

      .error{
        color: lightcoral;
      }

      @media only screen and (max-width: 768px) {
        .addnotes-bar {
          margin: 20px;
          padding: 20px;
        }

        form {
          max-width: 500px;
        }
      }

      @media only screen and (max-width: 576px) {
        .addnotes-bar {
          margin: 20px;
          padding: 20px;
        }

        form {
          max-width: 300px;
        }
      }

      @media only screen and (max-width: 320px) {
        .addnotes-bar {
          margin: 20px;
          padding: 20px;
        }

        form {
          max-width: 200px;
        }
      }
    `

    const styleElement = document.createElement('style')
    styleElement.textContent = noteCardStyles
    document.head.appendChild(styleElement)

    setTimeout(() => {
      animate(
        ".addnotes-bar",
        { x: [0, -200, 200, 0] },
        {
          duration: 5,
          offset: [0, 0.25, 0.75]
        }
      );
    }, 3000);

  }

  setupFormSubmission() {
    const form = this.querySelector('#inputNotesForm')
    form.addEventListener('submit', async (event) => {
      event.preventDefault()

      const title = form.querySelector('#title').value
      const description = form.querySelector('#description').value

      try {
        const response = await fetch(
          'https://notes-api.dicoding.dev/v2/notes',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: title,
              body: description,
            }),
          },
        )

        if (!response.ok) {
          throw new Error('Failed to add note'),
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create note',
          });
        }

        const data = await response.json()
        console.log(data)

        Swal.fire({
          icon: 'success',
          title: 'Catatan berhasil ditambahkan!',
          showConfirmButton: false,
          timer: 1500
        });
        form.reset();

      } catch (error) {
        console.error('Error:', error)
      }
    })
  }
}

customElements.define('addnotes-bar', AddNotes)
