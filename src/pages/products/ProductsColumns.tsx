import { ColumnDef } from '@tanstack/react-table';
import { ProductListItem } from '../../types';
import { cn } from '../../utils/cn';

export const PRODUCT_COLUMNS: ColumnDef<ProductListItem>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-900">{row.original.name}</p>
        <p className="text-gray-500">{row.original.slug}</p>
      </div>
    ),
  },
  {
    id: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const { subcategory } = row.original;
      const category = subcategory.categories[0]?.category.name;
      return category === subcategory.name ? category : `${category} / ${subcategory.name}`;
    },
  },
  {
    id: 'variants',
    header: 'Variants',
    cell: ({ row }) => row.original._count.options,
  },
  {
    id: 'specs',
    header: 'Specs',
    cell: ({ row }) => row.original._count.specs,
  },
  {
    accessorKey: 'sortOrder',
    header: 'Order',
  },
  {
    accessorKey: 'isPublished',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={cn(
          'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
          row.original.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600',
        )}
      >
        {row.original.isPublished ? 'Published' : 'Hidden'}
      </span>
    ),
  },
];
