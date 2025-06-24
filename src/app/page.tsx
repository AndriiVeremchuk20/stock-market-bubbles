'use client';
//import { Box } from '~/components/Box';
import { BuubleChart } from '~/components/bubble-chart';
import useSWR from 'swr';
import { Stock } from '~/services/fmp-api';
import { AppStore } from '~/store/app';
import Header from '~/components/header';
import Footer from '~/components/footer';
import { Skeleton } from '~/components/skeleton';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { skip, limit, sort } = AppStore((s) => s);
  const { data, error, isLoading } = useSWR<{ data: Stock[] }>(
    `/api/stock/screener?skip=${skip}&limit=${limit}&${sort==="losers"?"betaLowerThan=-1":sort==="gainers"?"betaMoreThan=3":""}`,
    fetcher,
    { refreshInterval: 5 * 60 * 1000 }
  );

  return (
    <main className='w-full bg-primary text-secondary'>
      <Header />
      <div className='h-screen w-full'>
        {isLoading ? <Skeleton /> : <BuubleChart stockDataList={data!.data} />}
      </div>
      <Footer />
    </main>
  );
}
