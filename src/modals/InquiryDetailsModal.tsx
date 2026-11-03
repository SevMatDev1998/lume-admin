import { Inquiry } from '../types';
import { useUpdateInquiryStatusMutation } from '../services/admin.service';
import { DetailsList } from '../components/ui/DetailsList';
import { StatusBadge } from '../components/ui/StatusBadge';
import { clientName, formatDateTime, PROFESSION_LABELS } from '../utils/format';
import StatusActions from './StatusActions';

const InquiryDetailsModal: ModalFC<{ inquiry: Inquiry }> = ({ inquiry, onCancel }) => {
  const [updateStatus] = useUpdateInquiryStatusMutation();
  const { user } = inquiry;

  return (
    <div className="space-y-4 p-8">
      <DetailsList
        items={[
          ['Status', <StatusBadge status={inquiry.status} />],
          ['Date', formatDateTime(inquiry.createdAt)],
          ['Client', clientName(user)],
          ['Email', <a href={`mailto:${user.email}`} className="text-bice-blue hover:underline">{user.email}</a>],
          ['Phone', user.phone && <a href={`tel:${user.phone}`} className="text-bice-blue hover:underline">{user.phone}</a>],
          ['Profession', user.profession && PROFESSION_LABELS[user.profession]],
          ['Product', inquiry.product?.name ?? 'Configurator'],
          ['Selection', inquiry.selection],
          ['Comment', inquiry.comment && <span className="whitespace-pre-line">{inquiry.comment}</span>],
        ]}
      />
      <StatusActions
        current={inquiry.status}
        onCancel={onCancel}
        onChange={(status) => updateStatus({ id: inquiry.id, status }).unwrap()}
        actions={[
          { status: 'IN_PROGRESS', label: 'Take in progress' },
          { status: 'CLOSED', label: 'Close' },
          { status: 'NEW', label: 'Back to new' },
        ]}
      />
    </div>
  );
};

export default InquiryDetailsModal;
