import { redis } from '~/server/db/redis';
import { getStockData, Stock } from '~/services/fmp-api';

export const dynamic = 'force-dynamic';

const volumeMoreThan = 10_000_000;

const secondsToNextDay = () => {
  const now = new Date();

  const tomorrowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  return Math.floor(tomorrowMidnight.getTime() / 1000);
};

export const GET = async (req: Request) => {
  const { searchParams, pathname, search } = new URL(req.url);

  const skip = Number(searchParams.get('skip'));
  const limit = Number(searchParams.get('limit'));
  const betaMoreThan = Number(searchParams.get('betaMoreThan'));
  const betaLowerThan = Number(searchParams.get('betaLowerThan'));

  const keyUrl = pathname + search;

  try {
    // check cached data in redis db
    const cachedData = await redis.get<Stock[]>(keyUrl);
    if (cachedData) {
      const parsedData = cachedData;
      return Response.json({ data: parsedData });
    }
  } catch (e) {
    console.error('[REDIS CONNECTION ERROR]');
  }

  let args: any = { limit: 600, volumeMoreThan };

  if (betaMoreThan) {
    args = { ...args, betaMoreThan };
  } else if (betaLowerThan) {
    args = { ...args, betaLowerThan };
  }

  const data = await getStockData({ ...args });

  const orderedData = data.sort((a, b) => b.volume - a.volume);

  await redis
    .pipeline()
    .set(keyUrl, orderedData.slice(skip, skip + limit))
    .expire(keyUrl, secondsToNextDay())
    .exec();

  return Response.json({
    data: data.sort((a, b) => b.volume - a.volume).slice(skip, skip + limit),
  });
};
