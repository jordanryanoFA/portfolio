export default function Display ({previous, operation, current}) {
    return (
        <div className="display">
            <div className="previous">
                {previous} {operation}
            </div>
            <div className="current">
                {current || "0"}
            </div>
        </div>
    )
}