const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
};


document.querySelector('#deleteBTN').classList.add(
    'fas',
    'fa-trash-alt',
    'float-right',
    'text-danger',
    'delete-book'
);

// liEl.append(deleteBTN);

// Delete the clicked note
function handleNoteDelete(e) {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();

    const deleteBTN = document.createElement('i');
    console.log(e.target);
    console.log(e.target.dataset.id);

    const noteId = e.target.dataset.id ;
  
    deleteNote(noteId).then(() => {
        // getAndRenderNotes();
        // renderActiveNote();
    }).catch(error => {
        console.error('Error deleting note:', error);
    });
}

async function deleteNote(id) {
    try {
        const response = await fetch(`/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to delete note');
        }
        window.location.reload()
        console.log('Note deleted successfully');
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}


document.querySelector("#logout").addEventListener("click", logout);
// document.querySelector('#deleteBTN').addEventListener('click', handleNoteDelete);