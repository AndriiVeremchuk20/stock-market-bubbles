import { getFinnData, Stock } from '~/services/fmp-api';

export const dynamic = 'force-dynamic';

type CustomCache = {
  data: Stock[];
  timestamp: number;
} | null;

let cache: CustomCache = null;

export const GET = async(req: Request) => {
  const { searchParams } = new URL(req.url);

  const skip = Number(searchParams.get('skip'));
  const limit = Number(searchParams.get('limit'));

  if (cache && Date.now() - cache.timestamp < 5 * 60 * 1000) {
    return Response.json({
      data: cache.data
        .slice(skip, skip + limit),
    });
  }

  const data = await getFinnData({});

  cache = { data, timestamp: Date.now() };

  return Response.json({
    data: data.slice(skip, skip + limit),
  });
}
