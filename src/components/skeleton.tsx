import { ComponentPropsWithoutRef } from 'react';
import { twJoin } from 'tailwind-merge';

export const Skeleton = (props: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={twJoin(
        props.className,
        'flex h-full w-full animate-pulse items-center justify-center bg-secondary/10'
      )}
    >
      <div className='animate-pulse text-2xl font-bold'>Wait</div>
    </div>
  );
};
