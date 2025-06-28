import { NextResponse, NextRequest } from 'next/server';
import { redis } from './server/db/redis';
import { Stock } from './server/services/fmp-api';

export const config = {
  matcher: '/api/:path*',
};

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // check data in cache and return if data exist
  if (pathname.startsWith('/api/stock/screener')) {
    const keyUrl = pathname + search;
    try {
      // check cached data in redis db
      const cached = await redis.get<Stock[]>(keyUrl);

      if (cached) {
        return NextResponse.json({ status: 200, message: 'ok', data: cached });
      }
    } catch (e) {
      console.error('[REDIS CONNECTION ERROR]');
    } finally {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
