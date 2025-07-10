import ky from 'ky';
import { env } from '~/env.mjs';
import { Stock } from '~/types/stock';

const baseURL = 'https://financialmodelingprep.com/api/v3/';
const { FMP_API_KEY } = env;

const FMPClient = ky.create({
  prefixUrl: baseURL,
  searchParams: {
    apikey: FMP_API_KEY,
  },
});

// screener
export const getStockData = async (searchParams: {
  betaMoreThan?: number;
  betaLowerthan?: number;
  limit?: number;
  volumeMoreThan?: number;
}) => {
  try {
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
  } catch (e) {
    throw e;
  }
};

export const getImageUrl = ({ symbol }: { symbol: string }) =>
  `https://financialmodelingprep.com/image-stock/${symbol}.png?apikey=${FMP_API_KEY}`;
