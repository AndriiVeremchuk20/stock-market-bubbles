export interface StockData {
  id: number;
  name: string;
  image: string;
  value: number;
}

export const TestData: StockData[] = [
  {
    id: 1,
    name: 'Tesla',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/640px-Tesla_logo.png',
    value: 152.34,
  },
  {
    id: 2,
    name: 'Nvidia',
    image: 'https://cdn-icons-png.flaticon.com/512/732/732230.png',
    value: 98.67,
  },
  {
    id: 3,
    name: 'Apple',
    image: 'https://cdn-icons-png.flaticon.com/512/0/747.png',
    value: 234.56,
  },
  {
    id: 4,
    name: 'Microsoft',
    image: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
    value: 121.78,
  },
  {
    id: 5,
    name: 'Fecabook',
    image:
      'https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png',
    value: 87.9,
  },
];
