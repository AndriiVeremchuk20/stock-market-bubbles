import ky from "ky";
import {getImageUrl} from "~/services/fmp-api";

export const dynamic = 'force-dynamic';

export const GET = async (req: Request, {params}: {params: {symbol: string}}) => {
  
	const {symbol} = params;

	const fmpImageURL = getImageUrl({symbol});

 const imageBuffer = await ky(fmpImageURL).arrayBuffer();

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  }); 
};
