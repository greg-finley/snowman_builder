interface ButtonProps {
  onClick: () => void;
  buttonText: string;
}

export default function Button(props: ButtonProps) {
  const { onClick, buttonText } = props;
  return (
    <button
      className="mt-3 bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform"
      onClick={() => onClick()}
    >
      {buttonText}
    </button>
  );
}
