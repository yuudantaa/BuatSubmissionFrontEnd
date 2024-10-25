const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static async createNote(title, body) {
    const response = await fetch(BASE_URL + '/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });

    if (response.status >= 200 && response.status < 300) {
      return await response.json();
    } else {
      throw new Error(`Failed to create note: ${response.statusText}`);
    }
  }

  static async getNotes() {
    const response = await fetch(BASE_URL + '/notes');

    if (response.status >= 200 && response.status < 300) {
      const result = await response.json();
      return result.data;
    } else {
      throw new Error(`Failed to get notes: ${response.statusText}`);
    }
  }

  static async deleteNote(noteId) {
    const response = await fetch(BASE_URL + `/notes/${noteId}`, {
      method: 'DELETE',
    });

    if (response.status >= 200 && response.status < 300) {
      return await response.json();
    } else {
      throw new Error(`Failed to delete note: ${response.statusText}`);
    }
  }
}

export default NotesApi;