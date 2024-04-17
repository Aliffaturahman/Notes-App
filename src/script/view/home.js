import notesData from '../data/data-dummy.js';

const home = () => {
    const loadingIndicator = document.querySelector('loading-indicator');
    loadingIndicator.show();

    const card = document.querySelector('.card');
    const addBox = document.querySelector('.addnotes-bar');
    const tambahCatatanButton = document.getElementById('addNote');
    const judulInput = document.getElementById('title');
    const deskripsiInput = document.getElementById('description');

    judulInput.maxLength = 25;
    deskripsiInput.maxLength = 80;

    function createDummyElement(noteData) {
        const { title, body, createdAt } = noteData;
    
        const list = document.createElement('li');
        list.classList.add('note');
        list.setAttribute('dataJudul', title);
        list.setAttribute('dataDeskripsi', body);
    
        const divDatas = document.createElement('div');
        divDatas.classList.add('datas');
    
        const pTitle = document.createElement('p');
        pTitle.innerHTML = title.length > 18 ? createNewLine(title) : title;
    
        const spanDesc = document.createElement('span');
        spanDesc.textContent = `${body}`;
    
        const divExtraContent = document.createElement('div');
        divExtraContent.classList.add('time');
    
        const spanDate = document.createElement('span');
        spanDate.textContent = dateFormat(createdAt);
        
        const divSettings = document.createElement('div');
        divSettings.classList.add('setting');
    
        const iSettings = document.createElement('i');
        iSettings.classList.add('material-symbols-outlined');
        iSettings.textContent = 'settings';
        
        const divDeleteIcon = document.createElement('div');
        divDeleteIcon.classList.add('deleteIcon');
        
        const deleteIcon = document.createElement('button');
        deleteIcon.classList.add('material-symbols-outlined', 'delete_forever');
        deleteIcon.textContent = 'delete_forever';
        
        divDatas.appendChild(pTitle);
        divDatas.appendChild(spanDesc);

        divDeleteIcon.appendChild(deleteIcon);
    
        divExtraContent.appendChild(spanDate);
        divExtraContent.appendChild(divSettings);
        divExtraContent.appendChild(divDeleteIcon);
    
        list.appendChild(divDatas);
        list.appendChild(divExtraContent);
    
        return list;
    }

    function loadNotesFromDataDummy() {
        const noteElements = notesData.map(note => createDummyElement(note));
        noteElements.forEach(noteElement => card.appendChild(noteElement));
    }    
    
    console.log(notesData);
    loadNotesFromDataDummy();

    judulInput.addEventListener('input', validateInput);
    deskripsiInput.addEventListener('input', validateInput);

    function validateInput() {
        const title = judulInput.value.trim();
        const description = deskripsiInput.value.trim();
        
        const judulError = document.getElementById('errorTitle');
        const deskripsiError = document.getElementById('errorDescription');

        judulError.textContent = title.length === 0 ? 'Judul tidak boleh kosong.' : (title.length === 25 ? 'Anda mencapai jumlah karakter maksimal untuk Judul : 25.' : '');
        deskripsiError.textContent = description.length === 0 ? 'Deskripsi tidak boleh kosong.' : (description.length === 80 ? 'Anda mencapai jumlah karakter maksimal untuk Deskripsi : 80.' : '');
    }

    tambahCatatanButton.addEventListener('click', addNote);

    function addNote() {
        const title = judulInput.value.trim();
        const description = deskripsiInput.value.trim();
        
        const judulError = document.getElementById('errorTitle');
        const deskripsiError = document.getElementById('errorDescription');

        const errorTitleMessage = `Judul tidak boleh kosong dan jumlah maksimal karakter adalah ${judulInput.maxLength}.`;
        const errorDescriptionMessage = `Deskripsi tidak boleh kosong dan jumlah maksimal karakter adalah ${deskripsiInput.maxLength}.`;
    
        if (title.length === 0) {
            judulError.textContent = errorTitleMessage;
        } 
        else {
            judulError.textContent = '';
        }
    
        if (description.length === 0) {
            deskripsiError.textContent = errorDescriptionMessage;
        } 
        else {
            deskripsiError.textContent = '';
        }
    
        if (judulError.textContent || deskripsiError.textContent) return;
    
        const note = createNoteElement(title, description);
        card.appendChild(note);
    
        saveDatasToStorage(title, description);
    }
    
    card.addEventListener('click', handleNoteClick);

    function handleNoteClick(event) {
        if (event.target.classList.contains('delete_forever')) {
            const parentNote = event.target.closest('.note');
            const title = parentNote.getAttribute('dataJudul');

            const deletePopup = document.querySelector('.deleteNotesConfirmation');
            deletePopup.style.display = 'block';

            document.getElementById('deleteTitle').textContent = title;

            const hapusButton = document.getElementById('confirmDeleteButton');
            hapusButton.addEventListener('click', function () {
                deleteDataFromStorage(title);
                parentNote.remove();
                deletePopup.style.display = 'none';
            });

            const batalButton = document.getElementById('cancelDeleteButton');
            batalButton.addEventListener('click', function () {
                deletePopup.style.display = 'none';
            });
        }
    }

    function createNoteElement(title, description) {
        const list = document.createElement('li');
        list.classList.add('note');
        list.setAttribute('dataJudul', title);
        list.setAttribute('dataDeskripsi', description);

        const divDatas = document.createElement('div');
        divDatas.classList.add('datas');

        const pTitle = document.createElement('p');
        pTitle.innerHTML = title.length > 18 ? createNewLine(title) : title;

        const spanDesc = document.createElement('span');
        spanDesc.textContent = description;
        
        const divExtraContent = document.createElement('div');
        divExtraContent.classList.add('time');
        
        const spanDate = document.createElement('span');
        spanDate.textContent = getTheCurrentDate();
        
        const divSettings = document.createElement('div');
        divSettings.classList.add('setting');
        
        const iSettings = document.createElement('i');
        iSettings.classList.add('material-symbols-outlined');
        iSettings.textContent = 'settings';
        
        const divDeleteIcon = document.createElement('div');
        divDeleteIcon.classList.add('deleteIcon');
        
        const deleteIcon = document.createElement('button');
        deleteIcon.classList.add('material-symbols-outlined', 'delete_forever');
        deleteIcon.textContent = 'delete_forever';

        divDatas.appendChild(pTitle);
        divDatas.appendChild(spanDesc);
        
        divDeleteIcon.appendChild(deleteIcon);

        divExtraContent.appendChild(spanDate);
        divExtraContent.appendChild(divSettings);
        divExtraContent.appendChild(divDeleteIcon);

        list.appendChild(divDatas);
        list.appendChild(divExtraContent);

        return list;
    }

    function saveDatasToStorage(title, description) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        const createdAt = new Date();
        const formattedDate = createdAt.toISOString();
    
        notes.push({ title: title, description: description, createdAt: formattedDate });
        localStorage.setItem('notes', JSON.stringify(notes));
    
        console.log(`Catatan baru yang berjudul '${title}' berhasil ditambahkan.`);
    }

    function loadDatasFromStorage() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => {
            const createdAt = new Date(note.createdAt);
            const formattedDate = dateFormat(createdAt);
            note.createdAt = formattedDate;
    
            const noteElement = createNoteElement(note.title, note.description);
            card.appendChild(noteElement);
        });
    }

    function deleteDataFromStorage(title) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        let updatedNotes = [];
    
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].title !== title) {
                updatedNotes.push(notes[i]);
            }
        }
    
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
        let timerInterval;
        Swal.fire({
            title: "Catatan Berhasil Dihapus!",
            html: "Pesan ini akan hilang dalam <b></b> milidetik.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {    
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });

        console.log(`Catatan yang berjudul '${title}' berhasil dihapus.`);
    }

    function getTheCurrentDate() {
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const formattedDate = formatter.format(today);
    
        return formattedDate;
    }     
        
    function dateFormat(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
    
        return `${day} ${month} ${year}, pukul ${hours}.${minutes}`;
    }

    function createNewLine(title) {
        const maxLength = 18;
        let line = '';
        let lines = [];
        
        for (let word of title.split(' ')) {
            if ((line + word).length > maxLength) {
                lines.push(line.trim());
                line = '';
            }
            line += `${word} `;
        }
        
        lines.push(line.trim());
        return lines.join('<br>');
    }
    loadDatasFromStorage();

    setTimeout(function() {
        loadingIndicator.hide();
    }, 3000);
};

export default home;