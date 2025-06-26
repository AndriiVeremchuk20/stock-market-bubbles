import { ChartCandlestick } from 'lucide-react';

export const Logo = () => {
  return (
    <div className='flex flex-col items-start justify-center space-y-3'>
      <div className='flex items-center justify-center font-bold hover:shadow-md hover:shadow-primary/10'>
        <ChartCandlestick/>
        <span className='text-nowrap sm:text-2xl text-md'>STOCK BUBBLES</span>
      </div>
    </div>
  );
};
