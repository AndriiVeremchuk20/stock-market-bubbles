import React from 'react';
import { render } from '@testing-library/react';
import BubbleChart from '~/components/bubble-chart';
import { Stock } from '~/types/stock';

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

describe('BuubleChart', () => {
  it('renders chart SVG', () => {
    render(<BubbleChart data={mockData} />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});
