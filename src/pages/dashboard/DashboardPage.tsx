import { Link } from 'react-router-dom';
import { CalendarDays, Inbox, LucideIcon, Timer, Users } from 'lucide-react';
import { useGetDashboardQuery } from '../../services/admin.service';
import RouteEnum from '../../enums/route.enum';
import { Loader } from '../../components/public/Loader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { clientName, formatDateTime, VISIT_PURPOSE_LABELS, VISIT_TYPE_LABELS } from '../../utils/format';

const StatCard = ({ label, value, href, icon: Icon }: { label: string; value: number; href: string; icon: LucideIcon }) => (
  <Link to={href} className="flex items-center gap-4 rounded-lg bg-white p-5 shadow-sm transition-shadow hover:shadow">
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-alice-blue text-bice-blue">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </Link>
);

const DashboardPage = () => {
  const { data, isLoading } = useGetDashboardQuery();

  if (isLoading || !data) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="New inquiries" value={data.newInquiries} href={RouteEnum.INQUIRIES} icon={Inbox} />
        <StatCard label="Inquiries in progress" value={data.inProgressInquiries} href={RouteEnum.INQUIRIES} icon={Timer} />
        <StatCard label="Bookings to confirm" value={data.newBookings} href={RouteEnum.BOOKINGS} icon={CalendarDays} />
        <StatCard label="Clients" value={data.users} href={RouteEnum.USERS} icon={Users} />
      </div>

      <section className="rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">Visits in the next 7 days</h2>
          <Link to={RouteEnum.BOOKINGS} className="text-sm text-bice-blue hover:underline">
            Open calendar
          </Link>
        </div>
        {data.upcomingBookings.length ? (
          <ul className="divide-y divide-gray-100">
            {data.upcomingBookings.map((booking) => (
              <li key={booking.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">{formatDateTime(booking.startsAt)}</p>
                  <p className="text-gray-500">
                    {clientName(booking.user)} · {booking.user.phone ?? 'no phone'}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <span>{VISIT_TYPE_LABELS[booking.visitType]}</span>
                  <span className="hidden sm:inline">{VISIT_PURPOSE_LABELS[booking.purpose]}</span>
                  <StatusBadge status={booking.status} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-8 text-center text-sm text-gray-500">No visits planned for the next 7 days.</p>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
