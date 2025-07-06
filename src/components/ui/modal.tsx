import { AnimatePresence } from 'framer-motion';
import {
  ComponentPropsWithRef,
  HTMLAttributes,
  ReactNode,
  useRef,
} from 'react';
import { motion, MotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useClickOutside } from '~/hooks/use-click-outside';

const ModalWrapper = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key='overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className='absolute left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-secondary/20'
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

type ModalProps = {
  title?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
} & ComponentPropsWithRef<'div'> &
  MotionProps;

export const Modal = ({ isOpen, onClose, ...rest }: ModalProps) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, onClose);

  return (
    <ModalWrapper isOpen={isOpen}>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        key='box'
        className={twMerge(
          'h-screen w-full rounded-xl border-2 bg-primary p-4 text-secondary',
          rest.className
        )}
      >
        {rest.children}
      </motion.div>
    </ModalWrapper>
  );
};

export const ModalHeader = ({
  className,
  ...props
}: ComponentPropsWithRef<'div'>) => {
  return (
    <div
      {...props}
      className={twMerge(
        'border-b border-secondary bg-primary text-xl font-bold',
        className
      )}
    />
  );
};

export const ModalBody = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={twMerge('bg-primary', className)} />;
};
