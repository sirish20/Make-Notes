document.addEventListener('DOMContentLoaded', () => {
    const notesDiv = document.getElementById('notes');
    const addNoteButton = document.getElementById('addNote');
  
    function loadNotes() {
      chrome.storage.local.get({ notes: [] }, (result) => {
        const notes = result.notes;
        notesDiv.innerHTML = '';
        notes.forEach((note, index) => {
          const noteDiv = document.createElement('div');
          noteDiv.className = 'note';
          noteDiv.innerHTML = `
            <textarea data-index="${index}">${note}</textarea>
            <span class="delete-button" data-index="${index}">&times;</span>
          `;
          notesDiv.appendChild(noteDiv);
        });
  
        document.querySelectorAll('.note textarea').forEach(textarea => {
          textarea.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            const updatedNote = e.target.value;
            notes[index] = updatedNote;
            chrome.storage.local.set({ notes });
          });
        });
  
        document.querySelectorAll('.delete-button').forEach(button => {
          button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            notes.splice(index, 1);
            chrome.storage.local.set({ notes }, loadNotes);
          });
        });
      });
    }
  
    addNoteButton.addEventListener('click', () => {
      const newNote = prompt('Enter your note:');
      if (newNote !== null && newNote.trim() !== "") {
        chrome.storage.local.get({ notes: [] }, (result) => {
          const notes = result.notes;
          notes.push(newNote);
          chrome.storage.local.set({ notes }, loadNotes);
        });
      }
    });
  
    loadNotes();
  });
  