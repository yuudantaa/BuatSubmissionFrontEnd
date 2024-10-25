import Utils from '../utils.js';
import NotesApi from '../data/remote/notes-api.js';

const home = () => {
  // Get references to elements
  const inputForm = document.querySelector('input-form');
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteQueryWaitingElement = noteListContainerElement.querySelector('.query-waiting');
  const noteLoadingElement = noteListContainerElement.querySelector('.input-loading');
  const noteListElement = noteListContainerElement.querySelector('notes-list');

  const createNote = async (title, body) => {
    showLoading();
    try {
      const newNote = await NotesApi.createNote(title, body);
      // Update UI with new note (optional)
      fetchNotes(); // Refresh notes list after creation
    } catch (error) {
      console.error('Failed to create note:', error);
      // Handle errors appropriately, maybe show an error message
    } finally {
      Utils.hideElement(noteLoadingElement); // Hide loading only after success/error
    }
  };

  const fetchNotes = async () => {
    try {
      const notes = await NotesApi.getNotes();
      displayNotes(notes);
      showNotesList();
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      // Handle errors appropriately, maybe show an error message
    } finally {
      showLoading(); // Call after successful fetch
    }
  };

  const displayNotes = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('notes-item');
      noteItemElement.notes = note; // Optional: store note data on the element
  
      // Create elements for each note property
      const noteIdElement = document.createElement('span');
      noteIdElement.classList.add('note-id'); // Add a class for styling
      noteIdElement.textContent = `ID: ${note.id}`;
  
      const noteTitleElement = document.createElement('h3');
      noteTitleElement.classList.add('note-title'); // Add a class for styling
      noteTitleElement.textContent = note.title;
  
      const noteBodyElement = document.createElement('p');
      noteBodyElement.classList.add('note-body'); // Add a class for styling
      noteBodyElement.textContent = note.body;
  
      const noteAuthorElement = document.createElement('span');
      noteAuthorElement.classList.add('note-author'); // Add a class for styling
      noteAuthorElement.textContent = `By: ${note.author || 'Unknown'}`; // Handle missing author
  
      const noteIsCompleteElement = document.createElement('span');
      noteIsCompleteElement.classList.add('note-is-complete'); // Add a class for styling
      noteIsCompleteElement.textContent = note.isComplete ? 'Completed' : 'Pending';
  
      // Append all elements to the note item
      noteItemElement.appendChild(noteIdElement);
      noteItemElement.appendChild(noteTitleElement);
      noteItemElement.appendChild(noteBodyElement);
      noteItemElement.appendChild(noteAuthorElement);
      noteItemElement.appendChild(noteIsCompleteElement);
  
      return noteItemElement;
    });

  Utils.emptyElement(noteListElement);
  noteListElement.append(...noteItemElements);
};

  const showNotesList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showLoading = () => {
    const noteLoadingElement = document.querySelector('.input-loading');
    if (noteLoadingElement) {
      Array.from(noteListContainerElement.children).forEach((element) => {
        Utils.hideElement(element);
      });
      Utils.showElement(noteLoadingElement);
    }
  };

  const showQueryWaiting = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteQueryWaitingElement);
  };

  // Add event listener to input-form
  inputForm.addEventListener('inputNotes', (event) => {
    const { title, body } = event.detail;
    createNote(title, body);
  });

  showQueryWaiting();
  fetchNotes(); 
};

export default home;