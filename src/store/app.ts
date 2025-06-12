import { create } from 'zustand';

type AppStore = {
  limit: number;
  skip: number;

  setSkip: ({ skip }: { skip: number }) => void;
};

export const AppStore = create<AppStore>((set) => ({
  limit: 100,
  skip: 0,

  setSkip: ({ skip }) => set({ skip }),
}));
