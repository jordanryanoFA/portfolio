import { useState } from "react";
import { questions } from "../data/questions";

/**
 * useQuiz()
 * Custom hook that encapsulates all quiz logic:
 * - current question index
 * - score handling
 * - quiz state (start, quiz, result)
 */
export function useQuiz() {
    const [step, setStep] = useState("start"); // "start" | "quiz" | "result"
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);

    // start the quiz
    const startQuiz = () => {
        setStep("quiz");
        setCurrentIndex(0);
        setScore(0);
    };
    // Handling the answer click
    const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const next = currentIndex + 1;

    // If there are more questions then go to next one
    if (next < questions.length) {
        // Go to next question
      setCurrentIndex(next);
    } else {
      // if not → go to result screen
      setStep("result");
    }
  };
  const restartQuiz = () => {
    setStep("start");
    setCurrentIndex(0);
    setScore(0);
  };
  const percentScore = Math.round((score / questions.length) * 100);
  return {
    step,
    currentIndex,
    score: percentScore,
    totalQuestions: questions.length,
    currentQuestion: questions[currentIndex],
    startQuiz,
    handleAnswer,
    restartQuiz,
};

}