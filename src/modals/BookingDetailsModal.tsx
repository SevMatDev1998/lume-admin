import { Booking } from '../types';
import { useUpdateBookingStatusMutation } from '../services/admin.service';
import { DetailsList } from '../components/ui/DetailsList';
import { StatusBadge } from '../components/ui/StatusBadge';
import { clientName, formatDateTime, PROFESSION_LABELS, VISIT_PURPOSE_LABELS, VISIT_TYPE_LABELS } from '../utils/format';
import StatusActions from './StatusActions';

const BookingDetailsModal: ModalFC<{ booking: Booking }> = ({ booking, onCancel }) => {
  const [updateStatus] = useUpdateBookingStatusMutation();
  const { user } = booking;

  return (
    <div className="space-y-4 p-8">
      <DetailsList
        items={[
          ['Status', <StatusBadge status={booking.status} />],
          ['Visit', <span className="font-medium">{formatDateTime(booking.startsAt)}</span>],
          ['Place', VISIT_TYPE_LABELS[booking.visitType]],
          ['Reason', VISIT_PURPOSE_LABELS[booking.purpose]],
          ['Client', clientName(user)],
          ['Email', <a href={`mailto:${user.email}`} className="text-bice-blue hover:underline">{user.email}</a>],
          ['Phone', user.phone && <a href={`tel:${user.phone}`} className="text-bice-blue hover:underline">{user.phone}</a>],
          ['Profession', user.profession && PROFESSION_LABELS[user.profession]],
          ['Comment', booking.comment && <span className="whitespace-pre-line">{booking.comment}</span>],
          ['Booked at', formatDateTime(booking.createdAt)],
        ]}
      />
      <StatusActions
        current={booking.status}
        onCancel={onCancel}
        onChange={(status) => updateStatus({ id: booking.id, status }).unwrap()}
        actions={[
          { status: 'CANCELLED', label: 'Cancel visit', danger: true },
          { status: 'CONFIRMED', label: 'Confirm' },
          { status: 'DONE', label: 'Mark as done' },
        ]}
      />
    </div>
  );
};

export default BookingDetailsModal;
