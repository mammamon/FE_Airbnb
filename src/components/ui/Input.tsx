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
  disabled?: boolean;
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
  disabled,
}: InputProps) => {
  const disabledClass = disabled ? 'disabled-input' : '';

  return (
    <div className={`input-wrapper ${error ? 'input-invalid' : ''}`}>
      {selectOptions ? (
        <select
          id={id}
          className={`p-[8px] text-black rounded-6 bg-[#ebebeb] ${disabledClass}`}
          {...register?.(name)}
          disabled={disabled}
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
          className={`p-10 w-full text-black rounded-6 bg-white ${disabledClass}`}
          {...register?.(name)}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {!!error && (
        <div className="tooltipError">
          <span className="tooltipErrorText">{error}</span>
          {type !== 'date' && type !== 'number' && <FontAwesomeIcon icon={faExclamationCircle} className="input-error-icon" />}
        </div>
      )}
    </div>
  );
};
