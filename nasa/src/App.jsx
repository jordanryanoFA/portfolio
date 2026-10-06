import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main" // (Ensure capitalization matches your file)
import SideBar from "./components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0] // YYYY-MM-DD
  )

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = `https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=${NASA_KEY}&date=${date}`

      try {
        setLoading(true)
        const res = await fetch(url)
        
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.statusText}`)
        }
        
        const apiData = await res.json()
        
        // 🚨 ADD THE CONSOLE LOG RIGHT HERE 🚨
        console.log("NASA API DATA:", apiData)
        
        // Search the array for the specific date the user requested
        const matchingPost = apiData.find(post => post.date === date)
        // If it finds the date, use it. If not, fallback to the most recent one.
        setData(matchingPost ? matchingPost : apiData[0]) 
        
      } catch (err) {
        console.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAPIData()
  }, [date])

  function handleYesterday() {
    const prev = new Date(date)
    prev.setDate(prev.getDate() - 1)
    setDate(prev.toISOString().split("T")[0])
  }

  function handleToday() {
    const today = new Date().toISOString().split("T")[0]
    setDate(today)
  }

  return (
    <>
      {loading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      ) : (
        data && <Main data={data} />
      )}

      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}

      {data && !loading && ( // Added !loading so footer hides while fetching a new day
        <Footer
          data={data}
          handleToggleModal={handleToggleModal}
          onYesterday={handleYesterday}
          onToday={handleToday}
        />
      )}
    </>
  )
}

export default App
