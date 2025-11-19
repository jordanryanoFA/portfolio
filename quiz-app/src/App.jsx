import QuizScreen from './components/QuizScreen';
import StartScreen from './components/StartScreen';
import ResultScreen from './components/ResultScreen';
import { useQuiz } from './hooks/useQuiz'
import './index.css'

function App() {
  const { step, currentIndex, currentQuestion, score, totalQuestions, startQuiz, handleAnswer, restartQuiz ,} = useQuiz();
  
  return (
    <>
      {step === "start" && <StartScreen onStart={startQuiz}/>}

      {step === "quiz" && (
        <QuizScreen question={currentQuestion} current={currentIndex + 1}  total={totalQuestions} onAnswer={handleAnswer}/>
      )}

      {step === "result" && (
        <ResultScreen score={score} total={totalQuestions} onRestart={restartQuiz}/>
      )}
    </>
  )
}

export default App
