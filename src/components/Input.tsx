import React from "react";

interface InputProps {
  label: string;
  registerValue: any;
  type?: string;
  error: any;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  label,
  registerValue,
  type,
  error,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={label} className="text-white">
        {label}
      </label>
      <input
        {...registerValue}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 rounded-md mb-2 text-black focus:outline-none"
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default Input;
