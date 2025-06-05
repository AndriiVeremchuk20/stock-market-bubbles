import Image from "next/image"
import {getLogoUrl, Stock} from "~/services/finance-data/fmp-api"

export const FinDataList = ({stockList}:{stockList: Stock[]}) => {

	return <div className="w-full flex flex-col">
	{stockList.map((item, i)=><FinDataItem key={i} stock={item}/>)}
	</div>
}

const FinDataItem = ({stock}:{stock:Stock}) => {

	return <div className="flex">
		<Image src={getLogoUrl({symbol: stock.symbol})} alt={stock.name} width={100} height={100}/>
		<div>{stock.name}</div>
	</div>
}
