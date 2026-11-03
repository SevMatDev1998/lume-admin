import { BookingStatus, InquiryStatus } from '../../types';
import { BOOKING_STATUS_LABELS, INQUIRY_STATUS_LABELS, STATUS_TONES } from '../../utils/format';
import { cn } from '../../utils/cn';

const LABELS: Record<InquiryStatus | BookingStatus, string> = { ...INQUIRY_STATUS_LABELS, ...BOOKING_STATUS_LABELS };

export const StatusBadge = ({ status }: { status: InquiryStatus | BookingStatus }) => (
  <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', STATUS_TONES[status])}>
    {LABELS[status]}
  </span>
);
