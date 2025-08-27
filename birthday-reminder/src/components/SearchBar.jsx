const SearchBar = ({ searchTearm, setSearchTerm }) => {
  return (
    <input 
        type="text"
        placeholder="search by name..." 
        value={searchTearm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '5px', padding : '5px',  width: '100%' }}/>
  )
}

export default SearchBar