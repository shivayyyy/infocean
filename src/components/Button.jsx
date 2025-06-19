"use client";

export const Button = ({ variant, text, startIcon, onClick }) => {
  const variants = {
    primary: " text-white bg-blue-600 ",
    secondary: "bg-blue-200 text-blue-700",
    danger: "bg-red-500 text-white",
  };

  const baseStyles =
    "px-4 py-2 rounded-md flex items-center font-normal transition-colors duration-200";
  return (
    <button onClick={onClick} className={`${variants[variant]} ${baseStyles}`}>
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {text}
    </button>
  );
};
