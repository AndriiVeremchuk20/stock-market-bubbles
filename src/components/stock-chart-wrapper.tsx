'use client';

import { AppStore } from '~/store/app';
import useSWR from 'swr';
import { Stock } from '~/server/services/fmp-api';
import { BuubleChart } from './bubble-chart';
import { Skeleton } from './skeleton';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function StockChartWrapper() {
  const { skip, limit, sort } = AppStore((s) => s);

  const queryParams = new URLSearchParams();
  if (typeof skip === 'number') queryParams.append('skip', skip.toString());
  if (typeof limit === 'number') queryParams.append('limit', limit.toString());
  if (sort === 'losers') queryParams.append('betaLowerThan', '-1');
  if (sort === 'gainers') queryParams.append('betaMoreThan', '3');

  const { data, error, isLoading } = useSWR<{ data: Stock[] }>(
    `/api/stock/screener?${queryParams.toString()}`,
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
    <div className='h-screen w-screen'>
      {isLoading ? (
        <Skeleton />
      ) : (
        <BuubleChart
          stockDataList={data!.data}
          key={`key:${skip}${limit}${sort}`}
        />
      )}
    </div>
  );
}
