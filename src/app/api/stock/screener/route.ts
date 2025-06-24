import { getStockData, Stock } from '~/services/fmp-api';

export const dynamic = 'force-dynamic';

/*
type DataCache = {
  data: Stock[];
  timestamp: number;
} | null;
*/

//let cache: CustomCache = null;

const volumeMoreThan = 10_000_000;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const skip = Number(searchParams.get('skip'));
  const limit = Number(searchParams.get('limit'));
  const betaMoreThan = Number(searchParams.get("betaMoreThan"));
  const betaLowerThan = Number(searchParams.get("betaLowerThan"));


  let args: any = {limit: 550, volumeMoreThan};

  if(betaMoreThan){
		args = {...args, betaMoreThan};
  }
  else if(betaLowerThan){
		args = {...args, betaLowerThan};
  }


  //if (cache && Date.now() - cache.timestamp < 60 * 60 * 1000) {
  //  return Response.json({
   //   data: cache.data.slice(skip, skip + limit),
   // });
 // }
  

  const data = await getStockData({...args});

  //cache = {
  //  data: data.sort((a, b) => b.volume - a.volume),
  //  timestamp: Date.now(),
  //};

  return Response.json({
    data: data.sort((a,b)=>b.volume - a.volume).slice(skip, skip + limit),
  });
};
