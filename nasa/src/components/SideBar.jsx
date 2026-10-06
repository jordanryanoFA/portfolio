import parse from 'html-react-parser'; // 1. Import the parser

export default function SideBar(props) {
    const { handleToggleModal, data } = props

    return (
        <div className="sidebar">
            <div onClick={handleToggleModal} className="bgOverlay"></div>
            <div className="sidebarContents">
                <h2>{data?.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data?.date}</p>
                    
                    {/* 2. Safely parse the HTML string into React elements */}
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
