import { Client, Databases, ID, Query } from 'appwrite' // Import necessary modules from Appwrite SDK

// Retrieve environment variables for Appwrite project, database, and collection IDs
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Initialize Appwrite client and set the endpoint and project ID
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Set the API endpoint
  .setProject(PROJECT_ID) // Set the project ID

// Initialize the database object using the client
const database = new Databases(client);

// Function to update the search count for a given search term and movie
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // 1. Use Appwrite SDK to check if the search term exists in the database
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm), // Query to find documents with the matching search term
    ])

    // 2. If it does, update the count
    if(result.documents.length > 0) {
      const doc = result.documents[0]; // Get the first matching document

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1, // Increment the count by 1
      })
    // 3. If it doesn't, create a new document with the search term and count as 1
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm, // Set the search term
        count: 1, // Initialize the count to 1
        movie_id: movie.id, // Set the movie ID
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // Set the poster URL
      })
    }
  } catch (error) {
    console.error(error); // Log any errors that occur
  }
}

// Function to get trending movies (commented out)
 export const getTrendingMovies = async () => {
  try {
   const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
     Query.limit(5), // Limit the results to 5 documents
     Query.orderDesc("count") // Order the results by count in descending order
   ])

   return result.documents; // Return the list of documents
  } catch (error) {
   console.error(error); // Log any errors that occur
  }
 }