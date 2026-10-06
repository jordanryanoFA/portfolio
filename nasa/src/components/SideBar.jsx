import parse from 'html-react-parser'; 

export default function SideBar(props) {
    const { handleToggleModal, data } = props

    return (
        <div className="sidebar">
            <div onClick={handleToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">
                <h2>{data?.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data?.date}</p>
                    
                    <div className="explanation-text">
                        {data?.explanation ? parse(data.explanation) : "Loading..."}
                    </div>
                    
                </div>
                <button onClick={handleToggleModal}>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}
