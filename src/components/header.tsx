'use client';

import { Logo } from './logo';
import { Filters } from './filters';
import { Tools } from './tools';

export default function Header() {
  return (
    <header className='flex h-[60px] w-full justify-between border-b border-secondary bg-primary px-3 sm:px-5'>
      <Logo />
      <div className='flex items-center gap-4'>
        <Filters />
        <Tools />
      </div>
    </header>
  );
}
