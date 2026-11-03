import { ColumnDef } from '@tanstack/react-table';
import { UserListItem } from '../../types';
import { clientName, formatDate, PROFESSION_LABELS } from '../../utils/format';

export const USER_COLUMNS: ColumnDef<UserListItem>[] = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-900">{clientName(row.original)}</p>
        <p className="text-gray-500">{row.original.email}</p>
      </div>
    ),
  },
  {
    id: 'phone',
    header: 'Phone',
    cell: ({ row }) => row.original.phone ?? '—',
  },
  {
    id: 'profession',
    header: 'Profession',
    cell: ({ row }) => (row.original.profession ? PROFESSION_LABELS[row.original.profession] : '—'),
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'inquiries',
    header: 'Inquiries',
    cell: ({ row }) => row.original._count.inquiries,
  },
  {
    id: 'bookings',
    header: 'Visits',
    cell: ({ row }) => row.original._count.bookings,
  },
  {
    accessorKey: 'createdAt',
    header: 'Registered',
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
];
