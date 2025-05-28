/**
 *  Fetches the list of folders from the server.
 *  @returns {Promise<Array>} - A promise that resolves to an array of folders.
 *  @throws {Error} - Throws an error if the fetch request fails.
 */
export const getFolders = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/folders`
    );
    console.log(response);

    if (!response.ok) throw new Error("Failed to fetch parcels");

    return await response.json();
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

/**
 * Given a folder name, creates a new folder on the server.
 * @returns {Promise<Object>} - A promise that resolves to the created folder object.
 * @throws {Error} - Throws an error if the fetch request fails.
 */
export const createFolder = async (folderName) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/folders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: folderName,
          id: crypto.randomUUID(),
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to create folder");

    return await response.json();
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};
