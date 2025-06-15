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
  logo?: string;
}

export const getFinnData = async ({
  betaMoteThan,
  betaLowerThan,
}: {
  betaMoteThan?: number;
  betaLowerThan?: number;
}) => {
  const data = await FMPClient.get('stock-screener', {
    searchParams: {
      volumeMoreThan: 10000000,
      limit: 500,
    },
  }).json<Stock[]>();

  return data
    .map((d) => ({ logo: getLogoUrl({ symbol: d.symbol }), ...d }))
    .filter((i) => i.beta);
};

export const getLogoUrl = ({ symbol }: { symbol: string }) =>
  `https://financialmodelingprep.com/image-stock/${symbol}.png?apikey=${FMP_API_KEY}`;
