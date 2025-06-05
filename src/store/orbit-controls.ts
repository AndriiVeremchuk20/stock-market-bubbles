import { atom } from 'jotai';
import APP_CONFIG from '~/app-convig';


	

export const OrbitControlAtom = atom<boolean>(APP_CONFIG.dev.enableOrbitControl);
