import { ReactNode } from 'react';
import { useGetUserQuery } from '../services/admin.service';
import { Loader } from '../components/public/Loader';
import { DetailsList } from '../components/ui/DetailsList';
import { StatusBadge } from '../components/ui/StatusBadge';
import { clientName, formatDate, formatDateTime, PROFESSION_LABELS, VISIT_TYPE_LABELS } from '../utils/format';

const History = ({ title, empty, children }: { title: string; empty: boolean; children: ReactNode }) => (
  <section className="space-y-2">
    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
    {empty ? <p className="text-sm text-gray-400">None yet.</p> : <ul className="divide-y divide-gray-100 text-sm">{children}</ul>}
  </section>
);

const UserDetailsModal: ModalFC<{ userId: string }> = ({ userId }) => {
  const { data: user, isLoading } = useGetUserQuery(userId);

  if (isLoading || !user) return <div className="p-8"><Loader /></div>;

  return (
    <div className="space-y-6 p-8">
      <DetailsList
        items={[
          ['Name', clientName(user)],
          ['Email', <a href={`mailto:${user.email}`} className="text-bice-blue hover:underline">{user.email}</a>],
          ['Phone', user.phone && <a href={`tel:${user.phone}`} className="text-bice-blue hover:underline">{user.phone}</a>],
          ['Profession', user.profession && PROFESSION_LABELS[user.profession]],
          ['Role', user.role],
          ['Email confirmed', user.isVerified ? 'Yes' : 'No'],
          ['Registered', formatDate(user.createdAt)],
        ]}
      />
      <History title={`Inquiries (${user.inquiries.length})`} empty={!user.inquiries.length}>
        {user.inquiries.map((inquiry) => (
          <li key={inquiry.id} className="flex items-center justify-between gap-3 py-2">
            <div className="min-w-0">
              <p className="truncate text-gray-900">{inquiry.product?.name ?? 'Configurator'}{inquiry.selection && ` · ${inquiry.selection}`}</p>
              <p className="text-gray-500">{formatDateTime(inquiry.createdAt)}</p>
            </div>
            <StatusBadge status={inquiry.status} />
          </li>
        ))}
      </History>
      <History title={`Visits (${user.bookings.length})`} empty={!user.bookings.length}>
        {user.bookings.map((booking) => (
          <li key={booking.id} className="flex items-center justify-between gap-3 py-2">
            <div>
              <p className="text-gray-900">{formatDateTime(booking.startsAt)}</p>
              <p className="text-gray-500">{VISIT_TYPE_LABELS[booking.visitType]}</p>
            </div>
            <StatusBadge status={booking.status} />
          </li>
        ))}
      </History>
    </div>
  );
};

export default UserDetailsModal;
