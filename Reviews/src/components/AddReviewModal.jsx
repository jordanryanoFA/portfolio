import { useState } from 'react';

const AddReviewModal = ({ onClose, onAdd, nextId }) => {
  const [formData, setFormData] = useState({
    name: '',
    job: '',
    image: '',
    text: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files.length > 0) {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if user uploaded file, convert to base64
    if (formData.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveReview(reader.result); // save with base64 image
      };
      reader.readAsDataURL(formData.file);
    } else {
      saveReview(formData.image); // save with link (or placeholder)
    }
  };

  const saveReview = (imageUrl) => {
    const newReview = {
      id: nextId,
      name: formData.name || 'Anonymous',
      job: formData.job || 'Unknown',
      image: imageUrl || 'https://via.placeholder.com/150',
      text: formData.text || 'No review text.',
    };

    // save to localStorage
    const saved = localStorage.getItem('reviews');
    const reviews = saved ? JSON.parse(saved) : [];
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    // update UI immediately
    onAdd(newReview);

    // close modal
    onClose();
  };

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h3>Add a New Review</h3>
        <form onSubmit={handleSubmit} className='review-form'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type='text'
            name='job'
            placeholder='Job'
            value={formData.job}
            onChange={handleChange}
          />
          <input
            type='text'
            name='image'
            placeholder='Image URL (optional)'
            value={formData.image}
            onChange={handleChange}
          />
          <input
            type='file'
            name='file'
            accept='image/*'
            onChange={handleChange}
          />
          <textarea
            name='text'
            placeholder='Review text'
            value={formData.text}
            onChange={handleChange}
          ></textarea>
          <div className='modal-actions'>
            <button type='submit' className='btn'>Add</button>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
