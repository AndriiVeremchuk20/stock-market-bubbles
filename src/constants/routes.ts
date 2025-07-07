const Routes = {
  home: '/',
  api: {
    stock: {
      screener: 'api/stock/screener',
      image: 'api/stock/image',
    },
  },
} as const;

export default Routes;
