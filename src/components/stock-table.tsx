'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Stock } from '~/server/services/fmp-api';

const ch = createColumnHelper<Stock>();

const columns = [
  {
    header: '#',
    cell: (info: any) => info.row.index + 1,
  },
  ch.accessor('symbol', {
    header: 'Ticker',
    cell: (info) => info.getValue(),
  }),

  ch.accessor('companyName', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),

  ch.accessor('price', {
    header: 'Price',
    cell: (info) => info.getValue(),
  }),
  ch.accessor('marketCap', {
    header: 'Market Cap',
    cell: (info) => info.getValue(),
  }),
  ch.accessor('volume', {
    header: 'Volume',
    cell: (info) => info.getValue() / 100,
  }),
  ch.accessor('beta', {
    header: 'Beta',
    cell: (info) => `${info.getValue().toFixed(2)}%`,
  }),
];

export const StockTable = ({ data }: { data: Stock[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='w-full p-4'>
      <table className='w-full'>
        <thead className='rounded-md bg-secondary/10'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className=''>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='border-y p-2'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className=''>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className='text-xl duration-200 hover:bg-secondary/30'
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-1'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
