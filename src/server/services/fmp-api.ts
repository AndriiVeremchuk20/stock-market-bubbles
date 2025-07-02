import { SimulationNodeDatum } from 'd3';
import ky from 'ky';
import { env } from '~/env.mjs';

//const baseURL = "https://financialmodelingprep.com/stable/search-symbol?query=AAPL&apikey=1qRlxu0Wph1LOkFVhdgg0Grt0lDsvPH6";

const baseURL = 'https://financialmodelingprep.com/api/v3/';
const { FMP_API_KEY } = env;

const FMPClient = ky.create({
  prefixUrl: baseURL,
  searchParams: {
    apikey: FMP_API_KEY,
  },
});

export interface Stock extends SimulationNodeDatum {
  symbol: string;
  companyName: string;
  marketCap: number;
  sector: string;
  industry: string;
  beta: number;
  price: number;
  lastAnnualDividend: number;
  volume: number;
  exchange: string;
  exchangeShortName: string;
  country: string;
  isEtf: boolean;
  isActivelyTrading: boolean;
}

// screener
export const getStockData = async (searchParams: {
  betaMoreThan?: number;
  betaLowerthan?: number;
  limit?: number;
  volumeMoreThan?: number;
}) => {
  const sp = Object.entries(searchParams)
    .filter(([_, value]) => value !== undefined)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, number>
    );

  const data = await FMPClient.get('stock-screener', {
    searchParams: { ...sp, isActivelyTrading: true },
  }).json<Stock[]>();

  return data.filter((i) => i.beta);
};

export const getImageUrl = ({ symbol }: { symbol: string }) =>
  `https://financialmodelingprep.com/image-stock/${symbol}.png?apikey=${FMP_API_KEY}`;
