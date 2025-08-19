import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import Tours from './components/Tours';
import Message from './components/Message'; 

const url = 'https://www.course-api.com/react-tours-project';

function App() {
  const [isloading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [message, setMessage] = useState(null);

  const removeTour = (id) => {
    setMessage({ text: "Tour removed!", type: "success" });
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
    setTimeout(() => setMessage(null), 2000); // hide after 2s
    }

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setMessage({ text: "Tours refreshed!", type: "info" });
      setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTours();
  }, []);

  if (isloading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  // TODO
  if (tours.length === 0)  {
    return (
      <div className='title'>
        {message && <Message text={message.text} type={message.type} />}
        <h2>no tours left</h2>
        <button type='button' style={{marginTop:'2rem'}} className='btn' onClick={()=> fetchTours()}>
          refresh
        </button>
      </div>
    )
  }
  return (
    <main>
      {message && <Message text={message.text} type={message.type} />}
      <Tours tours = {tours} removeTour = {removeTour} />
    </main>
  )
}

export default App
