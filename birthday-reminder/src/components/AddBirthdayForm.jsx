import { useState } from 'react';

const AddBirthday = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age || !image) {
      alert('Please fill all fields');
      return;
    }
    onAdd({ name, age: parseInt(age), image });
    setName('');
    setAge('');
    setImage('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h4>Add a Birthday</h4>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit" className="btn">Add</button>
    </form>
  );
};

export default AddBirthday;
