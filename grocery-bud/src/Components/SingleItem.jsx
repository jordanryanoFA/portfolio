
const SingleItem = ({item,removeItem,editItem}) => {
  return (
    <div 
        className="single-item" 
        checked={item.completed} 
        onChange={() => editItem(item.id)}
    >
        <input type="checkbox" />
        <p 
            style={{
                textTransform: 'capitalize',
                textDecoration: item.completed && 'line-through',
            }}
        >
            {item.name}
        </p>
        <button className="btn remove-btn" type="button" onClick={() => removeItem(item.id)}>
            delete
        </button>
    </div>
  )
}

export default SingleItem