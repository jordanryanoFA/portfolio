import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
import AddReviewModal from './components/AddReviewModal';

// helper: get reviews from localStorage or fallback
const getStoredReviews = () => {
  const saved = localStorage.getItem('reviews');
  return saved
    ? JSON.parse(saved)
    : [
        {
          id: 1,
          name: 'Susan Smith',
          job: 'Web Developer',
          image:
            'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
          text: 'This app is super easy to use! Clean design and smooth performance.',
        },
      ];
};

const App = () => {
  const [reviews, setReviews] = useState(getStoredReviews());
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // sync with localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const prevReview = () => {
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  };

  const nextReview = () => {
    setIndex((i) => (i + 1) % reviews.length);
  };

  const randomReview = () => {
    let randomIndex = Math.floor(Math.random() * reviews.length);
    if (randomIndex === index) {
      randomIndex = (index + 1) % reviews.length;
    }
    setIndex(randomIndex);
  };

  const addReview = (newReview) => {
    const updatedReviews = [...reviews, { id: Date.now(), ...newReview }];
    setReviews(updatedReviews);
    setIndex(updatedReviews.length - 1); // show the newly added review
    setShowModal(false);
  };

  const deleteReview = (id) => {
    const updated = reviews.filter((review) => review.id !== id);
    setReviews(updated);
    setIndex(0); // reset index to the first available review
  };

  if (reviews.length === 0) {
    return (
      <main>
        <h2>No reviews yet</h2>
        <button className="btn" onClick={() => setShowModal(true)}>
          Add Review
        </button>
        {showModal && (
          <AddReviewModal
            onClose={() => setShowModal(false)}
            onAdd={addReview}
            nextId={reviews.length + 1}
          />
        )}
      </main>
    );
  }

  const { id, name, job, image, text } = reviews[index];

  return (
    <main>
      {/* REVIEW DISPLAY */}
      <article className="review">
        <div className="img-container">
          <img src={image} alt={name} className="person-img" />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <h4 className="author">{name}</h4>
        <p className="job">{job}</p>
        <p className="info">{text}</p>
        <div className="btn-container">
          <button className="prev-btn" onClick={prevReview}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextReview}>
            <FaChevronRight />
          </button>
        </div>
        <button className="btn btn-hipster" onClick={randomReview}>
          Surprise Me
        </button>

        {/* DELETE BUTTON */}
        <button className="btn delete-btn" onClick={() => deleteReview(id)}>
          Delete Review
        </button>
      </article>

      {/* ADD REVIEW BUTTON */}
      <div className="add-review">
        <button className="btn" onClick={() => setShowModal(true)}>
          Add Review
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <AddReviewModal
          onClose={() => setShowModal(false)}
          onAdd={addReview}
          nextId={reviews.length + 1}
        />
      )}
    </main>
  );
};

export default App;
