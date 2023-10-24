/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLInputTypeAttribute } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

type SelectOption = {
  label: string;
  value: string | boolean;
};

type InputProps = {
  id?: string;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegister<FieldValues>;
  error?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void; 
  selectOptions?: SelectOption[];
};

export const Input = ({
  id,
  register,
  type,
  error,
  placeholder,
  name,
  selectOptions,
  onChange,
}: InputProps) => {
  console.log('Register function:', register);

  return (
    <div className={`input-wrapper ${error ? 'input-invalid' : ''}`}>
      {selectOptions ? (
        <select
          id={id}
          className="p-[8px] text-black rounded-6 bg-[#ebebeb]"
          {...register?.(name)}
        >
          {selectOptions.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          type={type}
          className="p-10 w-full text-black rounded-6 bg-white"
          {...register?.(name)}
          onChange={onChange}
        />
      )}
      {!!error && (
        <div className="tooltipError">
          <span className="tooltipErrorText">{error}</span>
          {type !== 'date' && <FontAwesomeIcon icon={faExclamationCircle} className="input-error-icon" />}
        </div>
      )}
    </div>
  );
};
