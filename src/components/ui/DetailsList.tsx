import { ReactNode } from 'react';

export const DetailsList = ({ items }: { items: [string, ReactNode][] }) => (
  <dl className="divide-y divide-gray-100 text-sm">
    {items.map(([label, value]) => (
      <div key={label} className="grid grid-cols-3 gap-4 py-2.5">
        <dt className="text-gray-500">{label}</dt>
        <dd className="col-span-2 break-words text-gray-900">{value || '—'}</dd>
      </div>
    ))}
  </dl>
);
