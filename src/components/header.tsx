'use client';

import { Info, Settings, SettingsIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { AppStore, SortType } from '~/store/app';
import { Logo } from './logo';
import { Modal, ModalBody, ModalHeader } from './modal';
import Image from 'next/image';
import Link from 'next/link';

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
  const { setSkip, skip, setSort, } = AppStore();

  const {setState} = AppStore

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    
	  const {value} = e.target;

	  if(isNaN(Number(value))){
		  setState({skip: 0, sort: value as SortType});
		  return;
	  } 

	  setState({sort: null, skip: (Number(value))});
	};

  return (
    <select
      defaultValue={skip}
      onChange={handleSelectChange}
      className='border-white rounded-md border bg-primary p-2'
    >
      <option value={100}>0 - 100</option>
      <option value={200}>101-200</option>
      <option value={300}>201-300</option>
      <option value={400}>301-400</option>
      <option value={500}>401-500</option>
      <option value={"gainers"}>📈 Best Gainers</option>
      <option value={"losers"}>📉 Best Losers</option>
    </select>
  );
};

const Tools = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showTools, setShowTools] = useState<boolean>(false);

  return (
    <div className='flex items-center gap-10'>
      <Info onClick={() => setShowInfo((prev) => !prev)} />
      <Settings onClick={() => setShowTools((prev) => !prev)} />
      {showInfo && (
        <Modal
          className='h-3/4 w-4/6'
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
        >
          <ModalHeader className='flex gap-1'>
            <Info /> Information
          </ModalHeader>
          <ModalBody className='p-y grid h-full w-full grid-cols-1 grid-rows-2 gap-2'>
            <div className='h-full space-y-2 rounded-md p-2 duration-200 hover:bg-secondary/20'>
              <h3>How to use</h3>
              <div>1. Wait for data loading.</div>
              <div>2. Look at the bubles:</div>
              <div className='flex justify-around'>
                <div>
                  <div className='flex h-[150px] w-[150px] flex-col items-center justify-center rounded-full border-2 border-green p-4'>
                    <Image
                      src='https://financialmodelingprep.com/image-stock/GOOG.png?apikey=1qRlxu0Wph1LOkFVhdgg0Grt0lDsvPH6'
                      alt='image'
                      width={70}
                      height={70}
                    />
                    <div>GOOGL</div>
                    <div className='text-sm font-bold'>+1.01%</div>
                  </div>
                  <div className='text-center'>Good</div>
                </div>
                <div>
                  <div className='flex h-[150px] w-[150px] flex-col items-center justify-center rounded-full border-2 border-red p-4'>
                    <Image
                      src='https://financialmodelingprep.com/image-stock/GOOG.png?apikey=1qRlxu0Wph1LOkFVhdgg0Grt0lDsvPH6'
                      alt='image'
                      width={70}
                      height={70}
                    />
                    <div>GOOGL</div>
                    <div className='text-sm font-bold'>-3.22%</div>
                  </div>
                  <div className='text-center'>Bad</div>
                </div>
              </div>
              <div>3. That&apos;s all</div>
            </div>
            <div className='h-full rounded-md bg-none p-2 duration-500 hover:bg-secondary/20'>
              <h3>About us</h3>
              <div>
                An interactive app that visualizes and compares company
                performance using dynamic, bubble-based charts. It&apos;s simplified
                open-source version of{' '}
                <Link href='https://bubblescreener.com/'>bubblescreener</Link>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
      {showTools && (
        <Modal
          className='h-3/4 w-3/4'
          isOpen={showTools}
          onClose={() => setShowTools(false)}
        >
          <ModalHeader className='flex gap-1'>
            <SettingsIcon /> Settings
          </ModalHeader>
          <ModalBody>In progress</ModalBody>
        </Modal>
      )}
    </div>
  );
};
