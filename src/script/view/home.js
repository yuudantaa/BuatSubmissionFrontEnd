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
    noteItemElement.notes = note;
    return noteItemElement;
  });

  // Add an element for the newly created note (optional)
  const newNoteElement = document.createElement('notes-item');
  newNoteElement.notes = { title, body }; // Use submitted title and body
  noteItemElements.unshift(newNoteElement); // Add to the beginning of the list

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