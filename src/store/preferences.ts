import { create } from 'zustand';

export type BubbleContent = 'beta' | 'price' | 'marketCap' | 'volume';
export type BubbleSize = 'beta' | 'marketCap' | 'volume';
export type BubbleColorScheme = 'r-g' | 'b-y' | 'neutral';

type PreferencesState = {
  bubbleContent: BubbleContent;
  bubbleSize: BubbleSize;
  bubbleColorScheme: BubbleColorScheme;

  setBubbleContent: (content: BubbleContent) => void;
  setBubbleSize: (size: BubbleSize) => void;
  setBubbleColorScheme: (scheme: BubbleColorScheme) => void;
};

export const usePreferencesStore = create<PreferencesState>((set) => ({
  bubbleContent: 'beta',
  bubbleSize: 'marketCap',
  bubbleColorScheme: 'r-g',

  setBubbleContent: (content) => set({ bubbleContent: content }),
  setBubbleSize: (size) => set({ bubbleSize: size }),
  setBubbleColorScheme: (scheme) => set({ bubbleColorScheme: scheme }),
}));
