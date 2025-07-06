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
    <div className='w-full'>
      <label
        htmlFor={id}
        className='flex cursor-pointer rounded-sm border-2 border-secondary'
      >
        <input
          type='radio'
          name={name}
          id={id}
          onChange={onChange}
          className={`peer hidden ${className ?? ''}`}
          {...other}
        />
        <span className='w-full p-1 text-sm duration-200 peer-checked:bg-secondary peer-checked:text-primary sm:text-xl'>
          {children}
        </span>
      </label>
    </div>
  );
};
