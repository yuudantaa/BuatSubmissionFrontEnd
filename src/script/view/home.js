import Notes from '../data/local/notes-data.js';

const home = () => {
  const inputFormElement = document.querySelector('input-form'); 
  const notesListContainerElement = document.getElementById('noteListContainer');
  const notesListElement = notesListContainerElement.querySelector('notes-list');

  const createNewNote = (title, body) => {
    const newNote = {
      id: Date.now(), 
      title,
      body,
      createdAt: new Date(),
      archived: false, 
    };
    Notes.push(newNote); 
    displayResult([newNote]); 
  };

  const displayAllNotes = () => {
    const allNotes = Notes; 
    displayResult(allNotes);
  };

  const displayResult = (notes) => {
    const notesItemElement = notes.map((notes) => {
      const notesItemElement = document.createElement('notes-item');
      notesItemElement.notes = notes;
      return notesItemElement;
    });

    notesListElement.innerHTML = '';
    notesListElement.append(...notesItemElement);
  };

  // Listen for a custom event named 'inputNotes' from input-form
  inputFormElement.addEventListener('inputNotes', (event) => {
    const { title, body } = event.detail;
    createNewNote(title, body);
  });

  // Optionally display all notes on page load (remove if not needed)
  displayAllNotes(); 


};

export default home;