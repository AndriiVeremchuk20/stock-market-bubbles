import { ComponentPropsWithRef } from 'react';

type RadioBoxProps = ComponentPropsWithRef<'input'>;

export const RadioBox = ({
  className,
  onChange,
  children,
  name,
  id,
  ...other
}: RadioBoxProps) => {
  return (
    <div className='w-fit'>
      <label
        htmlFor={id}
        className='flex cursor-pointer border-2 border-secondary'
      >
        <input
          type='radio'
          name={name}
          id={id}
          onChange={onChange}
          className={`peer hidden ${className ?? ''}`}
          {...other}
        />
        <span className='w-full px-2 py-1 duration-200 peer-checked:bg-secondary peer-checked:text-primary'>
          {children}
        </span>
      </label>
    </div>
  );
};
