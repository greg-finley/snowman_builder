import classNames from "classnames";

interface ButtonProps {
  onClick: () => void;
  buttonText: string;
  variant?: "primary" | "dull";
}

export default function Button(props: ButtonProps) {
  const { onClick, buttonText, variant } = props;
  const colorClass =
    !variant || variant === "primary"
      ? "bg-blue-300 hover:bg-blue-400"
      : "bg-gray-300 hover:bg-gray-400";
  return (
    <button
      className={classNames(
        colorClass,
        "mt-3 text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform",
      )}
      onClick={() => onClick()}
    >
      {buttonText}
    </button>
  );
}
