import { redis } from '~/server/db/redis';
import { getStockData } from '~/server/services/fmp-api';

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

  const skip = Number(searchParams.get('skip') ?? 0);
  const limit = Number(searchParams.get('limit') ?? 100);
  const betaMoreThan = Number(searchParams.get('betaMoreThan'));
  const betaLowerThan = Number(searchParams.get('betaLowerThan'));

  const keyUrl = pathname + search;

  let args: any = { limit: 600, volumeMoreThan };

  if (betaMoreThan) {
    args = { ...args, betaMoreThan };
  } else if (betaLowerThan) {
    args = { ...args, betaLowerThan };
  }

  try {
    const data = await getStockData({ ...args });

    const orderedData = data
      .sort((a, b) => b.volume - a.volume)
      .slice(skip, skip + limit);

    try {
      await redis
        .pipeline()
        .set(keyUrl, orderedData)
        .expire(keyUrl, secondsToNextDay())
        .exec();
    } catch (e) {
      console.log('[REDIS CONNECTION ERROR]');
    }

    return Response.json({
      status: 200,
      message: 'ok',
      data: orderedData,
    });
  } catch (e) {
    console.error('Server ERROR', e);
    return Response.json({ status: 500, message: 'Internal Server Error' });
  }
};
