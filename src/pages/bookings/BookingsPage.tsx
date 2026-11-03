import { useMemo, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, View, Views } from 'react-big-calendar';
import { addDays, addMinutes, endOfMonth, endOfWeek, format, getDay, parse, startOfMonth, startOfWeek } from 'date-fns';
import { enGB } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Tabs from '../../components/ui/Tabs';
import useModal from '../../hooks/useModal';
import { useGetBookingsQuery } from '../../services/admin.service';
import BookingDetailsModal from '../../modals/BookingDetailsModal';
import { Booking, BookingStatus } from '../../types';
import { BOOKING_STATUS_LABELS, clientName, toOptions, VISIT_TYPE_LABELS } from '../../utils/format';

const VISIT_MINUTES = 45;
const WEEK = { weekStartsOn: 1 } as const;
const STATUS_TABS = [{ value: '', label: 'All' }, ...toOptions(BOOKING_STATUS_LABELS)];

const STATUS_COLORS: Record<BookingStatus, string> = {
  NEW: '#286FB4',
  CONFIRMED: '#059669',
  DONE: '#6b7280',
  CANCELLED: '#dc2626',
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  getDay,
  startOfWeek: (date: Date) => startOfWeek(date, WEEK),
  locales: { 'en-GB': enGB },
});

const monthRange = (date: Date) => ({
  start: startOfWeek(startOfMonth(date), WEEK),
  end: addDays(endOfWeek(endOfMonth(date), WEEK), 1),
});

const toRange = (range: Date[] | { start: Date; end: Date }) =>
  Array.isArray(range) ? { start: range[0], end: addDays(range[range.length - 1], 1) } : range;

type BookingEvent = Omit<Event, 'resource'> & { resource: Booking };

const BookingsPage = () => {
  const open = useModal();
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [range, setRange] = useState(() => monthRange(new Date()));
  const [status, setStatus] = useState<BookingStatus | ''>('');

  const { data = [], isFetching } = useGetBookingsQuery({
    from: range.start.toISOString(),
    to: range.end.toISOString(),
    status: status || undefined,
  });

  const events = useMemo<BookingEvent[]>(
    () =>
      data.map((booking) => ({
        title: `${clientName(booking.user)} · ${VISIT_TYPE_LABELS[booking.visitType]}`,
        start: new Date(booking.startsAt),
        end: addMinutes(new Date(booking.startsAt), VISIT_MINUTES),
        resource: booking,
      })),
    [data],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
        {isFetching && <span className="text-sm text-gray-400">Loading…</span>}
      </div>
      <Tabs options={STATUS_TABS} value={status} onChange={(value) => setStatus(value as BookingStatus | '')} />
      <div className="h-[720px] rounded-lg bg-white p-3 shadow-sm">
        <Calendar<BookingEvent>
          localizer={localizer}
          culture="en-GB"
          events={events}
          view={view}
          date={date}
          onView={setView}
          onNavigate={setDate}
          onRangeChange={(next) => setRange(toRange(next))}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          min={new Date(1970, 0, 1, 9)}
          max={new Date(1970, 0, 1, 19)}
          step={15}
          timeslots={4}
          popup
          onSelectEvent={(event) => open(BookingDetailsModal, { title: 'Visit', booking: event.resource })}
          eventPropGetter={(event: BookingEvent) => ({
            style: { backgroundColor: STATUS_COLORS[event.resource.status], border: 'none' },
          })}
        />
      </div>
    </div>
  );
};

export default BookingsPage;
