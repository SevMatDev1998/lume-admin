import { useState } from 'react';
import { DataTable } from '../../components/ui/Table';
import Tabs from '../../components/ui/Tabs';
import { Loader } from '../../components/public/Loader';
import useListQuery from '../../hooks/useListQuery';
import useModal from '../../hooks/useModal';
import { useGetInquiriesQuery } from '../../services/admin.service';
import InquiryDetailsModal from '../../modals/InquiryDetailsModal';
import { InquiryStatus } from '../../types';
import { INQUIRY_STATUS_LABELS, toOptions } from '../../utils/format';
import { INQUIRY_COLUMNS } from './InquiriesColumns';

const STATUS_TABS = [{ value: '', label: 'All' }, ...toOptions(INQUIRY_STATUS_LABELS)];

const InquiriesPage = () => {
  const open = useModal();
  const [status, setStatus] = useState<InquiryStatus | ''>('');
  const { query, search, onChangePage, onSearch, onSortChange } = useListQuery();
  const { data, isLoading } = useGetInquiriesQuery({ ...query, status: status || undefined });

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">
        Inquiries <span className="font-normal text-gray-500">({data?.totalCount ?? 0})</span>
      </h1>
      <Tabs
        options={STATUS_TABS}
        value={status}
        onChange={(value) => {
          setStatus(value as InquiryStatus | '');
          onChangePage('1');
        }}
      />
      <DataTable
        data={data?.data ?? []}
        columns={INQUIRY_COLUMNS}
        totalCount={data?.totalCount ?? 0}
        search={search}
        onSearch={onSearch}
        onChangePage={onChangePage}
        onSortChange={onSortChange}
        onRowClick={(inquiry) => open(InquiryDetailsModal, { title: 'Inquiry', inquiry })}
      />
    </div>
  );
};

export default InquiriesPage;
