'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Logo } from './logo';

export default function Footer() {
  return (
    <footer className='flex h-fit w-full items-center justify-between border-t border-secondary bg-primary px-5 py-2 pb-8'>
      <div>
        <Logo />
        <div className='w-3/4 text-sm'>
          An interactive app that visualizes and compares company performance
          using dynamic, bubble-based charts.
        </div>
      </div>
      <div className=''>
        <PowerBy />
      </div>
    </footer>
  );
}

const PowerBy = () => {
  return (
    <div className='flex items-center gap-2 p-1'>
      <div className='text-md'>Power by:</div>
      <Link
        className='flex items-center gap-2 rounded-xl bg-secondary/20 p-2'
        href='https://site.financialmodelingprep.com/'
      >
        <Image
          src='https://intelligence.financialmodelingprep.com//images/logo/fmp-new-logo.svg'
          alt='FMP'
          width={30}
          height={30}
        />
        FMP
      </Link>
    </div>
  );
};
