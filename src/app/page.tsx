//import { Box } from '~/components/Box';
import {BuubleChart} from '~/components/bubble-chart';
import Header from '~/components/Header';
import {getFinnData} from '~/services/finance-data/fmp-api';

export default async function Home() {

const data = await  getFinnData();

  return (
    <>
		<BuubleChart stockDataList={data}/>

    </>
  );
}
