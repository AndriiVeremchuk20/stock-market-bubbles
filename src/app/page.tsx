//import { Box } from '~/components/Box';
import { BuubleChart } from '~/components/bubble-chart';
import { getFinnData } from '~/services/finance-data/fmp-api';

export default async function Home() {
  const data = await getFinnData();

  console.log(data);

  return (
    <>
      <BuubleChart stockDataList={data.slice(0, 101)} />
    </>
  );
}
