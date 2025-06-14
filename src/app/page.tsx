'use client';
//import { Box } from '~/components/Box';
import { BuubleChart } from '~/components/bubble-chart';
import useSWR from 'swr';
import { Stock } from '~/services/fmp-api';
import { AppStore } from '~/store/app';
import Header from '~/components/header';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { skip, limit } = AppStore((s) => s);
  const { data, error, isLoading } = useSWR<{ data: Stock[] }>(
    `/api/stock/screener?skip=${skip}&limit=${limit}`,
    fetcher,
    { refreshInterval: 5 * 60 * 1000 }
  );

  console.log(data);

  if (isLoading) return <div>Wait</div>;

  return ( 
    <main className='h-screen w-full bg-primary text-secondary'>
    <Header/>  
	<div className='w-full h-full'>
	 <BuubleChart stockDataList={data!.data} />
	</div>
    </main>
  );
}
