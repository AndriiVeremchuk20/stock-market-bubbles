import {
  AppWindowMac,
  Coffee,
  Github,
  Info,
  Linkedin,
  Mail,
  PersonStanding,
  Presentation,
  Settings,
  SettingsIcon,
} from 'lucide-react';
import { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from './modal';
import Image from 'next/image';
import Link from 'next/link';

export const Tools = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showTools, setShowTools] = useState<boolean>(false);

  return (
    <div className='flex items-center gap-3 sm:gap-10'>
      <Info onClick={() => setShowInfo((prev) => !prev)} />
      <Settings onClick={() => setShowTools((prev) => !prev)} />
      {showInfo && (
        <Modal
          className='h-full w-full sm:h-2/3 sm:w-2/4'
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
        >
          <ModalHeader className='flex gap-1'>
            <Info /> Information
          </ModalHeader>
          <ModalBody className='p-y flex w-full flex-col'>
            <div className='space-y-2 border-b p-2'>
              <h3 className='flex items-center gap-2 text-xl font-bold sm:text-2xl'>
                How to use <Presentation size={45} />{' '}
              </h3>
              <div>1. Wait for data loading.</div>
              <div>2. Look at the bubles:</div>
              <div className='flex justify-around'>
                <div>
                  <div className='flex h-[150px] w-[150px] flex-col items-center justify-center rounded-full border-2 border-green bg-primary p-4'>
                    <Image
                      src='/api/stock/image/GOOGL'
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
                  <div className='flex h-[150px] w-[150px] flex-col items-center justify-center rounded-full border-2 border-red bg-primary p-4'>
                    <Image
                      src='/api/stock/image/GOOGL'
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
              <div>3. That&apos;s all :)</div>
            </div>
            <div className='grid grid-cols-2 grid-rows-1'>
              <div className='h-full p-2'>
                <h3 className='flex items-center gap-2 text-xl font-bold sm:text-2xl'>
                  About App <AppWindowMac size={45} />
                </h3>
                <div>
                  An interactive app that visualizes and compares company
                  performance using dynamic, bubble-based charts. It&apos;s
                  simplified open-source version of{' '}
                  <Link
                    href='https://bubblescreener.com/'
                    className='underline duration-500 hover:text-secondary/80'
                  >
                    bubblescreener
                  </Link>
                </div>
              </div>
              <div className='p-2'>
                <h3 className='flex items-center text-xl font-bold sm:text-2xl'>
                  About Me <PersonStanding size={45} />
                </h3>
                <div>
                  <span>
                    I&apos;m a full-stack developer who loves bringing ideas and
                    visions to life.
                  </span>
                  <div className='flex flex-col justify-between gap-2 p-2 pt-4 sm:flex-row'>
                    <Link
                      href='https://github.com/AndriiVeremchuk20'
                      className='flex items-center gap-1 text-xl underline duration-200 hover:text-secondary/70'
                    >
                      Git <Github size={30} />
                    </Link>
                    <Link
                      href='https://www.linkedin.com/in/andrii-veremchuk-2a0940235'
                      className='flex items-center gap-1 text-xl underline duration-200 hover:text-secondary/70'
                    >
                      LinkedIn <Linkedin size={30} />
                    </Link>
                    <Link
                      href='mailto:andriiveremchuk313@gmail.com'
                      className='flex items-center gap-1 text-xl underline duration-200 hover:text-secondary/70'
                    >
                      Email <Mail size={30} />
                    </Link>

                    <Link
                      href='https://buymeacoffee.com/andriiveremchuk'
                      className='flex items-center gap-1 text-xl underline duration-200 hover:text-secondary/70'
                    >
                      Coffee <Coffee size={30} />
                    </Link>
                  </div>
                </div>
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
