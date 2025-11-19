export default function QuizScreen({ question, current, total, onAnswer }) {
    return (
        <div className="screen">
            <h2>
                Question {current} / {total}
            </h2>
            <p className="question">{question.question}</p>
            <div className="options">
                {question.options.map((opt, index) => (
                    <button key={index} className="btn-option" onClick={() => onAnswer(index === question.answer)}>
                        {opt}
                    </button>
                ))}
            </div>
            <div className="progress">
                <div
                className="progress-fill"
                style={{ width: `${(current / total) * 100}%` }}
                ></div>
            </div>
        </div>
    )
}