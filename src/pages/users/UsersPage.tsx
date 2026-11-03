import { DataTable } from '../../components/ui/Table';
import { Loader } from '../../components/public/Loader';
import useListQuery from '../../hooks/useListQuery';
import useModal from '../../hooks/useModal';
import { useGetUsersQuery } from '../../services/admin.service';
import UserDetailsModal from '../../modals/UserDetailsModal';
import { USER_COLUMNS } from './UsersColumns';

const UsersPage = () => {
  const open = useModal();
  const { query, search, onChangePage, onSearch, onSortChange } = useListQuery();
  const { data, isLoading } = useGetUsersQuery(query);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">
        Users <span className="font-normal text-gray-500">({data?.totalCount ?? 0})</span>
      </h1>
      <DataTable
        data={data?.data ?? []}
        columns={USER_COLUMNS}
        totalCount={data?.totalCount ?? 0}
        search={search}
        onSearch={onSearch}
        onChangePage={onChangePage}
        onSortChange={onSortChange}
        onRowClick={(user) => open(UserDetailsModal, { title: 'Client', className: '!max-w-[640px]', userId: user.id })}
      />
    </div>
  );
};

export default UsersPage;
