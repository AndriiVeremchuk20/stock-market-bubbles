'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { formatLargeNumber } from '~/lib/format-large-number';
import { formatPrice } from '~/lib/format-price';
import { Stock } from '~/types/stock';

const ch = createColumnHelper<Stock>();

const columns = [
  {
    header: '#',
    cell: (info: any) => info.row.index + 1,
  },
  ch.accessor('symbol', {
    header: 'Ticker',
    cell: (info) => (
      <span className='w-full rounded-xl bg-secondary/60 px-3 py-1 text-primary'>
        {info.getValue()}
      </span>
    ),
  }),

  ch.accessor('companyName', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),

  ch.accessor('price', {
    header: 'Price',
    cell: (info) => formatPrice(info.getValue()),
  }),
  ch.accessor('marketCap', {
    header: 'Market Cap',
    cell: (info) => formatLargeNumber(info.getValue()),
  }),
  ch.accessor('volume', {
    header: 'Volume',
    cell: (info) => formatLargeNumber(info.getValue()),
  }),
  ch.accessor('beta', {
    header: 'Beta',
    cell: (info) => (
      <span
        className={twMerge(
          info.getValue() > 0 ? 'bg-green' : 'bg-red',
          'rounded px-3 py-1'
        )}
      >
        {info.getValue().toFixed(2)}%
      </span>
    ),
  }),
];

export const StockTable = ({ data }: { data: Stock[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <div className='w-full p-4'>
      <div className='flex w-full items-center justify-center p-2'>
        <input
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className='w-1/4 rounded-full border-2 bg-secondary/10 p-2 px-4 text-xl outline-none'
          placeholder='Search'
        />
      </div>
      <table className='w-full'>
        <thead className='rounded-md bg-secondary/10'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className=''>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className='select-none p-3 text-left'
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort() ? 'flex cursor-pointer' : ''
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === 'asc'
                            ? 'Sort ascending'
                            : header.column.getNextSortingOrder() === 'desc'
                              ? 'Sort descending'
                              : 'Clear sort'
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronUp />,
                        desc: <ChevronDown />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
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
                <td key={cell.id} className={`p-3`}>
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
