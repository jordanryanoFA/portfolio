import { useState, useCallback } from "react";

export default function useCalculator() {
    // Current input value (ex: "12", "5.3")
  const [current, setCurrent] = useState("");

  // Previous stored value before an operation is executed
  const [previous, setPrevious] = useState("");

  // The selected operation (+, -, ×, ÷)
  const [operation, setOperation] = useState(null);

  // ----------------------------------------------------------
  // CALCULATION PROCESS
  // ----------------------------------------------------------
  /**
   * Runs the calculation based on previous, current, and operation.
   * Example: previous = "10", operation = "+", current = "5" → result = 15
   *
   * This function is called when:
   * - User presses "="
   * - User presses another operator (chained operations)
   */
  const calculate = useCallback(() => {
    // Prevent calculation if any required part is missing
    if (previous === "" || current === "" || !operation) return;

    const prev = parseFloat(previous);
    const curr = parseFloat(current);

    let result;

    switch (operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "×":
        result = prev * curr;
        break;
      case "÷":
        result = curr === 0 ? "Error" : prev / curr;
        break;
      default:
        return;
    }
    // Update the states after calculation
    setCurrent(result.toString());
    setPrevious("");
    setOperation(null);
  }, [previous, current, operation]);

  // ----------------------------------------------------------
  // NUMBER INPUT HANDLER
  // ----------------------------------------------------------
  /**
   * Handles digit input from 0–9 and decimal point.
   * Includes validation such as:
   * - Prevent double decimal (3.14.5 → not allowed)
   * - Reset if previous result was "Error"
   */
  const handleNumber = useCallback(
    (num) => {
        // If last result is "Error", reset first
      if (current === "Error") {
        setCurrent(num);
        return;
      }
      // Prevent multiple decimal points
      if (num === "." && current.includes(".")) return;

      // Append the new digit
      setCurrent(current + num);
    },
    [current]
  );

  // ----------------------------------------------------------
  // OPERATION HANDLER
  // ----------------------------------------------------------
  /**
   * Handles operators (+, -, ×, ÷)
   * Logic:
   * 1. If current is empty but previous exists → only update the operator
   * 2. If previous is empty → move current to previous
   * 3. If both exist → run chained calculation
   */
  const handleOperation = useCallback(
    (op) => {
        // If no new number but operator exists → allow operator change
      if (current === "") {
        if (previous !== "") setOperation(op);
        return;
      }
      // First operator press, move current → previous
      if (previous === "") {
        setPrevious(current);
        setCurrent("");
        setOperation(op);
        return;
      }

      // Chained operations (example: 10 + 5 × 3)
      calculate();
      setOperation(op);
    },
    [current, previous, calculate]
  );

  // ----------------------------------------------------------
  // CLEAR ENTIRE INPUT
  // ----------------------------------------------------------
  /**
   * Resets all calculator states to initial values.
   * Equivalent to pressing "C" on a real calculator.
   */
  const clearAll = useCallback(() => {
    setCurrent("");
    setPrevious("");
    setOperation(null);
  }, []);

  // ----------------------------------------------------------
  // DELETE LAST CHARACTER
  // ----------------------------------------------------------
  /**
   * Deletes the last character from the current number.
   * Example:
   * - "123" → "12"
   * - If error occurs → resets current
   */
  const deleteLast = useCallback(() => {
    if (current === "Error") {
      setCurrent("");
      return;
    }
    setCurrent(current.slice(0, -1));
  }, [current]);
  // Values & methods returned for use inside components
  return {
    current,
    previous,
    operation,
    handleNumber,
    handleOperation,
    calculate,
    clearAll,
    deleteLast,
  };
}
