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
import { useRef, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from './ui/modal';
import Image from 'next/image';
import Link from 'next/link';
import { RadioBox } from './ui/radio-box';
import {
  BubbleColorScheme,
  BubbleContent,
  BubbleSize,
  usePreferencesStore,
} from '~/store/preferences';
import { InfoModal } from './modal/info';
import { PreferencesModal } from './modal/preferences';

export const Tools = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);

  return (
    <div className='flex items-center gap-3 sm:gap-10'>
      <Info onClick={() => setShowInfo((prev) => !prev)} />
      <Settings onClick={() => setShowPreferences((prev) => !prev)} />
      {showInfo && (
        <InfoModal
          isOpen={showInfo}
          onClose={() => {
            setShowInfo(false);
          }}
        />
      )}
      {showPreferences && (
        <PreferencesModal
          isOpen={showPreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}
    </div>
  );
};
