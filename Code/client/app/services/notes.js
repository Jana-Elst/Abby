/**
 * Fetches a note by its ID from the API.
 *
 * @param {*} noteId
 * @returns {Promise<Object>} - A promise that resolves to the note object.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const getNoteById = async (noteId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/notes/${noteId}`
    );

    if (!response.ok) throw new Error("Failed to fetch note");

    return await response.json();
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
};

/**
 * Fetches all notes associated with a specific folder ID.
 *
 * @param {string} folderId - The ID of the folder.
 * @returns {Promise<Array>} - A promise that resolves to an array of notes.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const getNotesByFolderId = async (folderId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/notes?folderId=${folderId}`
    );

    if (!response.ok) throw new Error("Failed to fetch notes");

    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

/**
 * Creates a new note with the provided information.
 *
 * @param {Object} noteData - The data for creating the note.
 * @param {string} noteData.folderId - The ID of the folder to which the note belongs.
 * @param {string} noteData.title - The title of the note.
 * @param {string} noteData.content - The content of the note.
 * @returns {Promise<Object>} - A promise that resolves to the created note object.
 * @throws {Error} - Throws an error if the creation request fails.
 */
export const createNote = async ({ folderId, title, content }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderId,
        title,
        content,
        id: crypto.randomUUID(),
      }),
    });

    if (!response.ok) throw new Error("Failed to create note");

    return await response.json();
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

/**
 * Updates an existing note with the provided information.
 * @param {Object} param0 - The data for updating the note.
 * @param {string} param0.noteId - The ID of the note to be updated.
 * @param {string} param0.content - The new content for the note.
 * @returns {Promise<Object>} - A promise that resolves to the updated note object.
 * @throws {Error} - Throws an error if the update request fails.
 */

export const updateNote = async ({ noteId, content }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/notes/${noteId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to update note");

    return await response.json();
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};
