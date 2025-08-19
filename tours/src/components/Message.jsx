const Message = ({ text, type }) => {
  return (
    <div
      className={`p-3 rounded-md mb-3 text-center ${
        type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      {text}
    </div>
  );
};

export default Message;
