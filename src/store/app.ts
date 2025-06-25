import { create } from 'zustand';

export type SortType = 'gainers' | 'losers' | null;

type AppStore = {
  limit: number;
  skip: number;
  sort: SortType;

  setSkip: ({ skip }: { skip: number }) => void;
  setSort: ({ sort }: { sort: SortType }) => void;
};

export const AppStore = create<AppStore>((set) => ({
  limit: 100,
  skip: 0,
  sort: null,

  setSkip: ({ skip }) => set({ skip, sort: null }),
  setSort: ({ sort }: { sort: SortType }) => set({ sort, skip: 0 }),
}));
