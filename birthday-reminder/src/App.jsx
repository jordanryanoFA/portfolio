import { useState, useEffect } from 'react';
import List from './components/List';
import AddBirthdayForm from './components/AddBirthdayForm';

function App() {
  const [people, setPeople] = useState(() => {
    // Load from localStorage if available
    const savedPeople = localStorage.getItem('people');
    return savedPeople ? JSON.parse(savedPeople) : [];
  });

  // Save to localStorage whenever people changes
  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  const clearAll = () => setPeople([]);

  const addPerson = (newPerson) => {
    setPeople([...people, { id: Date.now(), ...newPerson }]);
  };

  return (
    <main>
      <section className="container">
        <h3>{people.length} birthdays today</h3>
        <AddBirthdayForm onAdd={addPerson} />
        <List people={people} />
        <button
          type="button"
          className="btn btn-block"
          onClick={clearAll}
        >
          Clear All
        </button>
      </section>
    </main>
  );
}

export default App;
