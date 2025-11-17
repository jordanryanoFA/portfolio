import './index.css'
import Display from "./Components/Display";
import ButtonGrid from "./Components/ButtonGrid";
import UseCalculator from "./Hooks/UseCalculator";
function App() {
  const {
    current,
    previous,
    operation,
    handleNumber,
    handleOperation,
    calculate,
    clearAll,
    deleteLast,
  } = UseCalculator();
  return (
    <div className='calculator'>
      <Display current={current} previous={previous} operation={operation} />
      <ButtonGrid onNumber={handleNumber} onOperation={handleOperation} onEqual={calculate} onClear={clearAll} onDelete={deleteLast} />
    </div>
  )
}

export default App
