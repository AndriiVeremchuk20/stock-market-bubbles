import React from 'react';
import { render } from '@testing-library/react';
import { Stock } from '~/types/stock';
import { StockTable } from '~/components/stock-table';

const mockData: Stock[] = [
  {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    marketCap: 1000000000,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    beta: 1.2,
    price: 150,
    lastAnnualDividend: 1,
    volume: 50000,
    isActivelyTrading: true,
    isEtf: true,
    exchange: 'test',
    exchangeShortName: 'test',
    country: 'US',
  },
];

describe('Stock Table', () => {
  it('render table', () => {
    render(<StockTable data={mockData} />);
    expect(document.querySelector('table')).toBeInTheDocument();
  });
});
