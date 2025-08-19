import PropTypes from 'prop-types'

// Define the MovieCard component, which takes a movie object as a prop
const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
  return (
    <div className="movie-card">
      {/* Display the movie poster or a default image if poster_path is not available */}
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
        alt={title}
      />

      <div className="mt-4">
        {/* Display the movie title */}
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            {/* Display a star icon and the movie's vote average, formatted to one decimal place */}
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
          {/* Display the original language of the movie */}
          <p className="lang">{original_language}</p>

          <span>•</span>
          {/* Display the release year of the movie, or 'N/A' if release_date is not available */}
          <p className="year">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}

// Define the prop types for the MovieCard component
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    original_language: PropTypes.string.isRequired,
  }).isRequired,
}

export default MovieCard