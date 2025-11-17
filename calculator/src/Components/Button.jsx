/**
 * Komponen tombol generik
 * text  : isi teks tombol
 * onClick : event handler
 * type : class tambahan (operator/function/equal)
 */
export default function Button({ text, onClick, type, className }) {
  return (
    <button
      className={`btn ${type || ""} ${className || ""}`}
      onClick={onClick}
      aria-label={text}
    >
      {text}
    </button>
  );
}
