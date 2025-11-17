import Button from "./Button";
/**
 * ButtonsGrid
 * Kumpulan tombol kalkulator dalam layout grid 4 kolom.
 * Semua handler dipass dari App.jsx.
 */
export default function ButtonGrid({
  onNumber,
  onOperation,
  onEqual,
  onClear,
  onDelete,
}) {
    return (
        <div className="buttons">
            <Button text="C" onClick={onClear} type="function" />
            <Button text="DEL" onClick={onDelete} type="function" />
            <Button text="÷" onClick={() => onOperation("÷")} type="operator" />
            <Button text="×" onClick={() => onOperation("×")} type="operator" />

            <Button text="7" onClick={() => onNumber("7")} />
            <Button text="8" onClick={() => onNumber("8")} />
            <Button text="9" onClick={() => onNumber("9")} />
            <Button text="-" onClick={() => onOperation("-")} type="operator" />

            <Button text="4" onClick={() => onNumber("4")} />
            <Button text="5" onClick={() => onNumber("5")} />
            <Button text="6" onClick={() => onNumber("6")} />
            <Button text="+" onClick={() => onOperation("+")} type="operator" />

            <Button text="1" onClick={() => onNumber("1")} />
            <Button text="2" onClick={() => onNumber("2")} />
            <Button text="3" onClick={() => onNumber("3")} />
            <Button text="=" onClick={onEqual} type="equal" />

            <Button text="0" onClick={() => onNumber("0")} className="zero" />
            <Button text="." onClick={() => onNumber(".")} />
        </div>
    )
}