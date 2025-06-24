import { ChartCandlestick } from 'lucide-react';

export const Logo = () => {
  return (
    <div className='flex flex-col items-start justify-center space-y-3'>
      <div className='flex items-center justify-center text-xl font-bold hover:shadow-md hover:shadow-primary/10'>
        <ChartCandlestick />
        <span>STOCK BUBBLES</span>
      </div>
    </div>
  );
};
