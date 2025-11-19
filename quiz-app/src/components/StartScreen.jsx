export default function StartScreen({ onStart}) {
    return (
        <div className="screen">
            <h1>Welcome to the Quiz!</h1>
            <button className="btn" onClick={onStart}>
                Start Quiz
            </button>
        </div>
    )
}