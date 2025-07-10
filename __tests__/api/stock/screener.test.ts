import { NextRequest } from 'next/server';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const testStockData: Stock[] = [
  {
    symbol: 'SPAN',
    companyName: 'Span-America Medical Systems, Inc.',
    marketCap: 0,
    sector: '',
    industry: '',
    beta: 0.29,
    price: 29.99,
    lastAnnualDividend: 0,
    volume: 88027,
    exchange: 'NASDAQ',
    exchangeShortName: 'NASDAQ',
    country: 'US',
    isEtf: false,
    isActivelyTrading: false,
  },
  {
    symbol: 'NMRX',
    companyName: 'Numerex Corp',
    marketCap: 0,
    sector: '',
    industry: '',
    beta: 0.47,
    price: 3.83,
    lastAnnualDividend: 0,
    volume: 44394,
    exchange: 'NASDAQ',
    exchangeShortName: 'NASDAQ',
    country: 'US',
    isEtf: false,
    isActivelyTrading: false,
  },
  {
    symbol: 'LTM',
    companyName: 'LATAM Airlines Group S.A.',
    marketCap: 12717375520,
    sector: 'Industrials',
    industry: 'Airlines, Airports & Air Services',
    beta: 1.128,
    price: 42.08,
    lastAnnualDividend: 0.63632,
    volume: 264566,
    exchange: 'New York Stock Exchange',
    exchangeShortName: 'NYSE',
    country: 'CL',
    isEtf: false,
    isActivelyTrading: true,
  },
];

// mock redis db
vi.mock('~/server/db/redis', () => {
  const pipelineMock = {
    set: vi.fn().mockReturnThis(),
    expire: vi.fn().mockReturnThis(),
    exec: vi.fn().mockResolvedValue(null),
  };

  return {
    redis: {
      pipeline: vi.fn(() => pipelineMock),
    },
  };
});

// mock api caller
vi.mock('~/server/services/fmp-api', () => ({ getStockData: vi.fn() }));

import { GET } from '~/app/api/stock/screener/route';
import { middleware } from '~/middleware';
import { getStockData } from '~/server/services/fmp-api';
import { Stock } from '~/types/stock';

describe('GET /api/stock/screener', () => {
  // clear all mocks
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns ordered stock data with status 200', async () => {
    (getStockData as any).mockResolvedValue(testStockData);

    const url = 'http://lockalhost:3000/api/stock/screener?skip=1&limit=2';
    const req = new Request(url);

    const res = await GET(req);
    const json = await res.json();

    expect(json.status).toBe(200);
    expect(json.message).toBe('ok');
    expect(json.data).toHaveLength(2);
    expect(json.data[0].volume).toBeGreaterThanOrEqual(json.data[1].volume);
  });

  it('handle getStockData Error and return status 500', async () => {
    (getStockData as any).mockResolvedValue(new Error('API failure'));

    const url = 'http://lockalhost:3000/api/stock/screener?skip=1&limit=2';
    const req = new Request(url);

    const res = await GET(req);
    const json = await res.json();

    expect(json.status).toBe(500);
    expect(json.message).toBe('Internal Server Error');
  });

  it('return data from cache withoud calling getStockData return ordered data and status 200', async () => {
    const redisModule = await import('~/server/db/redis');
    redisModule.redis.get = vi.fn().mockResolvedValue(testStockData);

    (getStockData as any).mockResolvedValue(testStockData);

    const url = 'http://lockalhost:3000/api/stock/screener';
    const req = new NextRequest(url);

    const res = await middleware(req);
    const json = await res.json();

    expect(json.status).toBe(200);
    expect(json.message).toContain('ok');
    expect(json.data).toHaveLength(3);
  });
});
