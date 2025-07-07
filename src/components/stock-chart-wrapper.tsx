'use client';

import { AppStore } from '~/store/app';
import useSWR from 'swr';
import BubbleChart from './bubble-chart';
import { Skeleton } from './skeleton';
import { StockTable } from './stock-table';
import { Stock } from '~/types/stock';
import Routes from '~/constants/routes';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function StockChartWrapper() {
  const { skip, limit, sort } = AppStore((s) => s);

  const queryParams = new URLSearchParams();
  if (typeof skip === 'number') queryParams.append('skip', skip.toString());
  if (typeof limit === 'number') queryParams.append('limit', limit.toString());
  if (sort === 'losers') queryParams.append('betaLowerThan', '-1');
  if (sort === 'gainers') queryParams.append('betaMoreThan', '5');

  const { data, isLoading } = useSWR<{ data: Stock[] }>(
    `${Routes.api.stock.screener}?${queryParams.toString()}`,
    fetcher,
    {
      refreshInterval: 60 * 3600,
      onError(e) {
        console.log(e);
        alert('Something happened. Try reloading the page later.');
      },
    }
  );

  return (
    <div className='max-h-full min-h-screen'>
      {isLoading ? (
        <Skeleton className='h-screen w-full' />
      ) : (
        <>
          <BubbleChart data={data!.data} key={`key:${skip}${limit}${sort}`} />
          <div className='hidden md:block'>
            <StockTable data={data!.data} />
          </div>
        </>
      )}
    </div>
  );
}
