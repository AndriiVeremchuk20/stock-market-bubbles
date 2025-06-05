import ky from "ky";
import { env } from "~/env.mjs"

//const baseURL = "https://financialmodelingprep.com/stable/search-symbol?query=AAPL&apikey=1qRlxu0Wph1LOkFVhdgg0Grt0lDsvPH6"; 

const baseURL = "https://financialmodelingprep.com/stable"; 
const {FMP_API_KEY} = env; 

const FMPClient = ky.create({
	prefixUrl: baseURL,
	searchParams:{
		apikey: FMP_API_KEY
	}
});

export type Stock = {
    symbol: string,
    price: number,
    name: string,
    change: number,
    changesPercentage: number,
    exchange: string,
	logo?: string,
  }

export const getFinnData = async () => {
	const data = await FMPClient.get("most-actives").json<Stock[]>();
	return data.map(d=>({ logo: getLogoUrl({symbol: d.symbol}), ...d}));
}

export const getLogoUrl = ({symbol}:{symbol:string}) => 
	`https://financialmodelingprep.com/image-stock/${symbol}.png?apikey=${FMP_API_KEY}`
		
