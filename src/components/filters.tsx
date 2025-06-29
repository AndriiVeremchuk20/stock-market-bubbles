import { ChangeEvent } from 'react';
import { AppStore, SortType } from '~/store/app';

export const Filters = () => {
  const { skip, setSkip, setSort } = AppStore();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (isNaN(Number(value))) {
      return setSort({ sort: value as SortType });
    }

    setSkip({ skip: Number(value) });
  };

  return (
    <select
      defaultValue={skip}
      onChange={handleSelectChange}
      className='border-white w-[100px] rounded-md border bg-primary p-1 text-xs sm:w-full sm:p-2 sm:text-xl'
    >
      <option value={0}>0 - 100</option>
      <option value={100}>101-200</option>
      <option value={200}>201-300</option>
      <option value={300}>301-400</option>
      <option value={400}>401-500</option>
      <option value={'gainers'}>📈 Top Gainers</option>
      <option value={'losers'}>📉 Top Losers</option>
    </select>
  );
};
