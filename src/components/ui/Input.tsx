/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputTypeAttribute } from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputProps = {
  label?: string;
  id?: string;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegister<any>;
  error?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectOptions?: string[];
};

export const Input = ({
  label,
  id,
  register,
  type = 'text',
  error,
  placeholder,
  className = '',
  name,
  selectOptions, 
}: InputProps) => {
  return (
    <div className={className}>
      {!!label && (
        <label className="text-white" htmlFor={id}>
          {label}
        </label>
      )}
      {selectOptions ? ( 
        <select
          id={id}
          className="p-10 w-50 ml-[20px] mt-[20px] text-white rounded-6 bg-[#333]"
          {...register?.(name)}
        >
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          type={type}
          className="p-10 w-full text-white rounded-6 bg-[#333]"
          {...register?.(name)}
        />
      )}
      {!!error && <p className="text-red-500 text-[12.5px] mt-1">{error}</p>}
    </div>
  );
};
