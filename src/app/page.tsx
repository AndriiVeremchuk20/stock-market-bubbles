'use client';
//import { Box } from '~/components/Box';
import { BuubleChart } from '~/components/bubble-chart';
import useSWR from 'swr';
import { Stock } from '~/services/fmp-api';
import { AppStore } from '~/store/app';
import Header from '~/components/header';
import Footer from '~/components/footer';
import { Skeleton } from '~/components/skeleton';
import {useEffect} from 'react';

const fetcher = (url: string) => {

	console.log("fetch for", url)

	return fetch(url).then((r) => r.json())};

export default function Home() {
  const { skip, limit, sort } = AppStore((s) => s);
  
  const queryParams = new URLSearchParams();
  if (typeof skip === 'number') queryParams.append('skip', skip.toString());
  if (typeof limit === 'number') queryParams.append('limit', limit.toString());
  if (sort === 'losers') queryParams.append('betaLowerThan', '-1');
  if (sort === 'gainers') queryParams.append('betaMoreThan', '3');


  const { data, error, isLoading } = useSWR<{ data: Stock[] }>(
    `/api/stock/screener?${queryParams.toString()}`,
    fetcher,
    { refreshInterval: 60 * 3600 }
  );

  useEffect(()=>{
	console.log("data changed", data?.data.length);
	}, [data?.data]);

  return (
    <main className='w-full bg-primary text-secondary'>
      <Header />
      <div className='h-screen w-full'>
        {isLoading ? <Skeleton /> : <BuubleChart stockDataList={data!.data} key={`key:${skip}${limit}${sort}`} />}
      </div>
      <Footer />
    </main>
  );
}
