'use client';

import { ChartCandlestick } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='flex h-fit w-full justify-between border-t border-secondary bg-primary px-5 py-2'>
      <Logo />
      <div className='p-4'>
        <PowerBy />
      </div>
    </footer>
  );
}

const PowerBy = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='text-md'>Power by:</div>
      <Link className='flex items-center gap-4 bg-secondary/20 px-4 py-1 rounded-xl' href='https://site.financialmodelingprep.com/'>
        <Image
          src='https://intelligence.financialmodelingprep.com//images/logo/fmp-new-logo.svg'
          alt='FMP'
          width={50}
          height={50}
        />
        FMP
      </Link>
    </div>
  );
};

const Logo = () => {
  return (
    <div className='flex space-y-3 flex-col justify-center items-start'>
	  <div className='flex items-center justify-center font-bold hover:shadow-md hover:shadow-primary/10'>
      <ChartCandlestick />
      <span>STOCK BUBBLES</span>
    </div>
	<div className='w-1/2 text-sm'>
An interactive app that visualizes and compares company performance using dynamic, bubble-based charts.
	</div>
	</div>
  );
};
