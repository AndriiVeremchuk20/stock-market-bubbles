import { Info, Settings } from 'lucide-react';
import { useState } from 'react';
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
