import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { divideAndRoundUp } from '../../utils/utils';
import { useQueryParameter } from '../../hooks/usePageQuery';
import TableSearch from '../public/TableSearch';

interface DataTableProps<T> {
  showPagination?:boolean,
  showSearch?:boolean,
  data: T[];
  totalCount: number;
  columns: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onChangePage: (page: string) => void;
  onSearch: (event: string) => void;
  onRowClick?: (row: T) => void;
  onSortChange?: (sort: { sortBy?: string; sortOrder?: 'asc' | 'desc' }) => void;

  search?: string
}

export function DataTable<T>({showPagination=true,showSearch= true, data, totalCount, columns, onChangePage, onSearch, onRowClick, onSortChange, search }: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { paramValue: currentPage, updateQueryParameter: updatePageQuery } = useQueryParameter(
    'page',
    (value) => onChangePage(value || '1') // Default to page 1 if no value
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: Boolean(onSortChange),
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;

      setSorting(next);
      onSortChange?.({ sortBy: next[0]?.id, sortOrder: next[0] ? (next[0].desc ? 'desc' : 'asc') : undefined });
    },
  });

  const totalPage = divideAndRoundUp(totalCount);

  return (
    <div className="w-full">
      {showSearch && <div>
        <TableSearch onChange={onSearch} search={search} />
      </div>}

      <div className="rounded-md border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort() && Boolean((header.column.columnDef as any).accessorKey);
                  const direction = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        canSort ? 'cursor-pointer select-none hover:text-gray-700' : ''
                      }`}
                    >
                      {header.isPlaceholder ? null : (
                        <span className="inline-flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort &&
                            (direction === 'asc' ? (
                              <ArrowUp className="h-3.5 w-3.5" />
                            ) : direction === 'desc' ? (
                              <ArrowDown className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronsUpDown className="h-3.5 w-3.5 text-gray-300" />
                            ))}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={onRowClick ? 'hover:bg-gray-50 cursor-pointer' : 'hover:bg-gray-50'}
                onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-[5px] text-xs whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      { 
        showPagination &&
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updatePageQuery((parseInt(currentPage || '1', 10) - 1).toString())}
              className="p-1 rounded-md disabled:opacity-50"
              disabled={parseInt(currentPage || '1', 10) <= 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => updatePageQuery((parseInt(currentPage || '1', 10) + 1).toString())}
              className="p-1 rounded-md disabled:opacity-50"
              disabled={parseInt(currentPage || '1', 10) >= totalPage}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page {Math.min(parseInt(currentPage || '1', 10), totalPage)} of {totalPage}
            </span>
          </div>
        </div>
      }
    </div>
  );
}
