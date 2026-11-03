import { ColumnDef } from '@tanstack/react-table';
import { Inquiry } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { clientName, formatDateTime } from '../../utils/format';

export const INQUIRY_COLUMNS: ColumnDef<Inquiry>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    id: 'client',
    header: 'Client',
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-900">{clientName(row.original.user)}</p>
        <p className="text-gray-500">{row.original.user.email}</p>
      </div>
    ),
  },
  {
    id: 'phone',
    header: 'Phone',
    cell: ({ row }) => row.original.user.phone ?? '—',
  },
  {
    id: 'product',
    header: 'Product',
    cell: ({ row }) => (
      <div className="max-w-xs truncate">
        <p className="font-medium text-gray-900">{row.original.product?.name ?? 'Configurator'}</p>
        {row.original.selection && <p className="truncate text-gray-500">{row.original.selection}</p>}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];
