import { useEffect, useState } from 'react';
import Search from './components/Search.jsx'
import Spinner from './components/spinner.jsx';
import MovieCard from './components/MovieCard.jsx';
import { useDebounce } from 'react-use'
import {getTrendingMovies, updateSearchCount } from './appwrite.js';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL= 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // State to hold the debounced search term
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const [errorMessage, setErrorMessage] = useState(''); // State to hold the error message
  const [movieList, setMovieList] = useState([]); // State to hold the movies
  const [isLoading, setIsLoading] = useState(false); // State to hold the loading status
  const [trendingMovies, setTrendingMovies] = useState([]); // State to hold the trending movies
  

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status}`);
      }
  
      const data = await response.json();
      
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
      
      if(query && data.results.length > 0) {
       await updateSearchCount(query, data.results[0]);
      } 
    } catch (error) {
      console.error('Error fetching movies: ', error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }
  
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  useEffect(() => {
    loadTrendingMovies();
  }
  , []);
  return (
    <main>
      <div className="pattern" />
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you enjoy without the hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
        
        <section className="all-movies">
          <h2 >All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
