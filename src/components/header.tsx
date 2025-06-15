'use client';

import { ChartCandlestick, Info, Settings } from 'lucide-react';
import { ChangeEvent } from 'react';
import { AppStore } from '~/store/app';

export default function Header() {
  return (
    <header className='flex h-[50px] w-full justify-between border-b border-secondary bg-primary px-5'>
      <Logo />
      <div className='flex items-center gap-10'>
        <Filters />
        <Tools />
      </div>
    </header>
  );
}

const Filters = () => {
  const { setSkip, skip } = AppStore();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSkip({ skip: Number(e.target.value) });
  };

  return (
    <select
      defaultValue={skip}
      onChange={handleSelectChange}
      className='border-white rounded-md border bg-primary p-2'
    >
      <option selected value={100}>
        0 - 100
      </option>
      <option value={200}>101-200</option>
      <option value={300}>201-300</option>
      <option value={400}>301-400</option>
      <option value={500}>401-500</option>
      <option>📈 Best Gainers</option>
      <option>📉 Best Losers</option>
    </select>
  );
};

const Logo = () => {
  return (
    <div className='flex items-center justify-center font-bold'>
      <ChartCandlestick />
      <span>STOCK BUBBLES</span>
    </div>
  );
};

const Tools = () => {
  return (
    <div className='flex items-center gap-10'>
      <Info />
      <Settings />
    </div>
  );
};
