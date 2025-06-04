import { useField } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CustomInput({ label, ...props }) {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType =
    props.type === "password"
      ? showPassword
        ? "text"
        : "password"
      : props.type;

  return (
    <div className="flex flex-col relative">
      <label htmlFor={field.name} className="text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={field.name}
          {...field}
          {...props}
          type={inputType}
          className={`w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
            meta.touched && meta.error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-600 focus:ring-orange-500"
          } focus:outline-none focus:ring-2 transition-colors duration-200 placeholder-gray-400 pr-10`}
        />
        {props.type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 cursor-pointer"
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
}
