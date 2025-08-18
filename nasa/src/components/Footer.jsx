export default function Footer(props) {
  const { handleToggleModal, data, onYesterday, onToday } = props
  return (
    <footer>
      <div className="bgGradient"></div>
      <div>
        <h1>APOD PROJECT</h1>
        <h2>{data?.title}</h2>
      </div>
      <div className="controls">
        <button onClick={onYesterday}>⬅ Yesterday</button>
        <button onClick={onToday}>Today</button>
        <button onClick={handleToggleModal}>
          <i className="fa-solid fa-circle-info"></i>
        </button>
      </div>
    </footer>
  )
}
