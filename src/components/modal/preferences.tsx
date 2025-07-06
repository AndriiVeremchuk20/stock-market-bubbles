import { SettingsIcon } from 'lucide-react';
import {
  BubbleColorScheme,
  BubbleContent,
  BubbleSize,
  usePreferencesStore,
} from '~/store/preferences';
import { Modal, ModalBody, ModalHeader } from '../ui/modal';
import { RadioBox } from '../ui/radio-box';

const bubbleContentOptions: BubbleContent[] = [
  'beta',
  'price',
  'marketCap',
  'volume',
];
const bubbleSizeOptions: BubbleSize[] = ['beta', 'marketCap', 'volume'];
const colorSchemeOptions: BubbleColorScheme[] = ['r-g', 'b-y', 'neutral'];

export const PreferencesModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    bubbleSize,
    bubbleContent,
    bubbleColorScheme,
    setBubbleSize,
    setBubbleContent,
    setBubbleColorScheme,
  } = usePreferencesStore();

  return (
    <Modal className='h-3/4 w-3/4' isOpen={isOpen} onClose={onClose}>
      <ModalHeader className='flex gap-1'>
        <SettingsIcon /> Settings
      </ModalHeader>
      <ModalBody className='flex flex-col gap-4'>
        <form className='flex items-center gap-2'>
          <span>Bubble Content:</span>
          {bubbleContentOptions.map((option) => (
            <RadioBox
              key={option}
              name='bubbleContent'
              id={`bubbleContent-${option}`}
              checked={bubbleContent === option}
              onChange={() => setBubbleContent(option)}
            >
              {option}
            </RadioBox>
          ))}
        </form>
        {/* Bubble Size */}
        <form className='flex items-center gap-2'>
          <span>Bubble Size:</span>
          {bubbleSizeOptions.map((option) => (
            <RadioBox
              key={option}
              name='bubbleSize'
              id={`bubbleSize-${option}`}
              checked={bubbleSize === option}
              onChange={() => setBubbleSize(option)}
            >
              {option}
            </RadioBox>
          ))}
        </form>
        {/* Bubble Color Scheme */}
        <form className='flex items-center gap-2'>
          <span>Color Scheme:</span>
          {colorSchemeOptions.map((option) => (
            <RadioBox
              key={option}
              name='colorScheme'
              id={`colorScheme-${option}`}
              checked={bubbleColorScheme === option}
              onChange={() => setBubbleColorScheme(option)}
            >
              {option}
            </RadioBox>
          ))}
        </form>{' '}
      </ModalBody>
    </Modal>
  );
};
