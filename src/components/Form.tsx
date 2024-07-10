import React from "react";

interface FormProps {
  errors: any;
  isSubmitting: boolean;
  handleSubmit: any;
  onSubmit: any;
  children: React.ReactNode;
  buttonText: string;
  title: string;
}

const Form: React.FC<FormProps> = ({
  errors,
  isSubmitting,
  handleSubmit,
  onSubmit,
  children,
  buttonText,
  title,
}) => {
  return (
    <>
      <div className="w-[400px] h-auto bg-gray-500 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center text-white p-4">{title}</h1>
        {errors && <p className="text-red-500">{errors.message}</p>}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 flex flex-col gap-2"
        >
          {children}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : buttonText}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
