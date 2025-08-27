const SortButtons = ({sortAsc, sortDesc}) => {
  return (
    <div className="sort-buttons">
        <button onClick={sortAsc} >Sort By Age</button>
        <button onClick={sortDesc} className="">Sort by Age ↓</button>
    </div>
  )
}

export default SortButtons