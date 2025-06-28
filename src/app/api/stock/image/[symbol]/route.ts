import ky from 'ky';
import { getImageUrl } from '~/server/services/fmp-api';

export const dynamic = 'force-dynamic';

export const GET = async (
  req: Request,
  { params }: { params: { symbol: string } }
) => {
  const { symbol } = params;
  const fmpImageURL = getImageUrl({ symbol });

  try {
    await ky.head(fmpImageURL);

    const imageBuffer = await ky(fmpImageURL).arrayBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error: any) {
    // Image does not exist or some other network error
    return new Response(JSON.stringify({ error: 'Image not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
