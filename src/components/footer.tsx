'use client';

import {ChartCandlestick } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <header className='flex h-fit w-full justify-between border-t border-secondary bg-primary px-5'>
      <Logo />
	  <div className='flex items-center gap-10'>
		<div>Power by</div> <Image src="https://intelligence.financialmodelingprep.com//images/logo/fmp-new-logo.svg" alt="FMP" width={80} height={80}/>
	  </div>
    </header>
  );
}


const Logo = () => {
  return <div className='flex justify-center items-center font-bold'>
<ChartCandlestick />
<span>STOCK BUBBLES</span>
  </div>;
};

