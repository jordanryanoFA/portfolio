import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import Tours from './components/Tours';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const url = 'https://www.course-api.com/react-tours-project';

function App() {
  const [isloading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    toast.warning("Tour removed!");
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
    }

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      toast.info("Tours refreshed!");
    } catch (error) {
      toast.error("Error fetching tours!");
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
         <ToastContainer position="top-center" autoClose={2000} />
      </main>
    )
  }
  // TODO
  if (tours.length === 0)  {
    return (
      <div className='title'>
        <h2>no tours left</h2>
        <button type='button' style={{marginTop:'2rem'}} className='btn' onClick={()=> fetchTours()}>
          refresh
        </button>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    )
  }
  return (
    <main>
      <Tours tours = {tours} removeTour = {removeTour} />
      <ToastContainer position="top-center" autoClose={2000} />
    </main>
  )
}

export default App
