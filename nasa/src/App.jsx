import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/main"
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

  async function fetchAPIData(selectedDate) {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${selectedDate}`

    try {
      setLoading(true)
      const res = await fetch(url)
      const apiData = await res.json()
      setData(apiData)
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAPIData(date)
  }, [date]) // runs again when date changes

  // Go to yesterday’s APOD
  function handleYesterday() {
    const prev = new Date(date)
    prev.setDate(prev.getDate() - 1)
    setDate(prev.toISOString().split("T")[0])
  }

  // Go back to today’s APOD
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

      {data && (
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
