import { BookingStatus, Client, InquiryStatus, OptionType, Profession, VisitPurpose, VisitType } from '../types';

export const TIME_ZONE = 'Asia/Yerevan';

const DATE_TIME = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, dateStyle: 'medium', timeStyle: 'short' });
const DATE = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, dateStyle: 'medium' });

export const formatDateTime = (value: string | Date) => DATE_TIME.format(new Date(value));
export const formatDate = (value: string | Date) => DATE.format(new Date(value));

export const clientName = ({ firstName, lastName, email }: Pick<Client, 'firstName' | 'lastName'> & { email?: string }) =>
  [firstName, lastName].filter(Boolean).join(' ') || email || '—';

export const INQUIRY_STATUS_LABELS: Record<InquiryStatus, string> = {
  NEW: 'New',
  IN_PROGRESS: 'In progress',
  CLOSED: 'Closed',
};

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  NEW: 'New',
  CONFIRMED: 'Confirmed',
  DONE: 'Done',
  CANCELLED: 'Cancelled',
};

export const VISIT_TYPE_LABELS: Record<VisitType, string> = {
  OFFICE: 'At our office',
  CLINIC: 'At the clinic',
};

export const VISIT_PURPOSE_LABELS: Record<VisitPurpose, string> = {
  FITTING: 'Fitting and measurement',
  SERVICE: 'Service and adjustment',
  CONSULTATION: 'Consultation',
};

export const PROFESSION_LABELS: Record<Profession, string> = {
  DENTIST: 'Dentist',
  HYGIENIST: 'Hygienist',
  SURGEON: 'Surgeon',
  STUDENT: 'Student',
  OTHER: 'Other',
};

export const OPTION_TYPE_LABELS: Record<OptionType, string> = {
  MAGNIFICATION: 'Magnification',
  COLOR: 'Colour',
  SIZE: 'Size',
  TEMPLE_TIP: 'Temple tip',
};

export const STATUS_TONES: Record<InquiryStatus | BookingStatus, string> = {
  NEW: 'bg-blue-50 text-blue-700',
  IN_PROGRESS: 'bg-amber-50 text-amber-700',
  CONFIRMED: 'bg-emerald-50 text-emerald-700',
  DONE: 'bg-gray-100 text-gray-700',
  CLOSED: 'bg-gray-100 text-gray-700',
  CANCELLED: 'bg-red-50 text-red-700',
};

export const toOptions = <V extends string>(labels: Record<V, string>) =>
  (Object.entries(labels) as [V, string][]).map(([value, label]) => ({ value, label }));
