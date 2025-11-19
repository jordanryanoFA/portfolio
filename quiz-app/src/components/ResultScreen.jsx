export default function ResultScreen({ score, onRestart }) {
    return (
        <div className="screen">
            <h1>Quiz Complete</h1>

            <div className="score-card">
                {score === 100 ? (
                    <p className="perfect">Perfect Score! 🎉</p>
                ) : (
                    <p className="score">{score}%</p>
                )}
            </div>

            <button className="btn" onClick={onRestart}>
                Restart
            </button>
        </div>
    );
}
