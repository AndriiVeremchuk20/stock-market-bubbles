import { Stock } from '~/server/services/fmp-api';

export const StockList = ({ data }: { data: Stock[] }) => {
  return (
    <table>
      <thead></thead>
      <tbody>
        {data.map((s, i) => (
          <StockItem key={i} data={s} />
        ))}
      </tbody>
    </table>
  );
};

const StockItem = ({ data }: { data: Stock }) => {
  return (
    <tr>
      <td>{data.companyName}</td>
      <td>{data.volume}</td>
      <td>{data.price}</td>
      <td>{data.beta}</td>
      <td>{data.marketCap}</td>
    </tr>
  );
};
