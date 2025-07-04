import { create } from 'zustand';

type BubbleContent = 'beta' | 'price' | 'marketCap' | 'volume';
type BubbleSize = 'beta' | 'marketCap' | 'volume';
type BubbleColorScheme = 'r-g' | 'b-y' | 'neutral';

type PreferencesState = {
  bubbleContent: BubbleContent;
  bubbleSize: BubbleSize;
  bubbleColorScheme: BubbleColorScheme;

  setBubbleContent: (content: BubbleContent) => void;
  setBubbleSize: (size: BubbleSize) => void;
  setBubbleColorScheme: (scheme: BubbleColorScheme) => void;
};

export const PreferencesStore = create<PreferencesState>((set) => ({
  bubbleContent: 'beta',
  bubbleSize: 'marketCap',
  bubbleColorScheme: 'r-g',

  setBubbleContent: (content) => set({ bubbleContent: content }),
  setBubbleSize: (size) => set({ bubbleSize: size }),
  setBubbleColorScheme: (scheme) => set({ bubbleColorScheme: scheme }),
}));
