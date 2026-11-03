import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface IRegisterInput {
  register: UseFormRegister<any>; // Replace 'any' with a specific type if possible
  label?: string;
  name: string;
  type?: string;
  errors: Record<string, any>;
}

const RegisterInput: FC<IRegisterInput> = ({ register, errors, label = "", name, type = "text" }) => {
  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        {...register(name, { required: `${label} is required` })}
        type={type}
        autoComplete={type === "password" ? "current-password" : "off"}
        className="
          appearance-none 
          relative 
          block 
          w-full
          px-3 
          py-2
          border
          border-gray-300
          placeholder-gray-500
          text-gray-900 
          focus:outline-none
          focus:ring-bice-blue
          focus:border-bice-blue 
          focus:z-10 
          sm:text-sm 
          rounded-lg
        "
        placeholder={label}
      />
      {errors[name] && (
        <p className="mt-1 ml-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
};

export default RegisterInput;
