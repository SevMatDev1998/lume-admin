import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { DataTable } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import { Loader } from '../../components/public/Loader';
import useListQuery from '../../hooks/useListQuery';
import { useGetCategoriesQuery, useGetProductsQuery } from '../../services/admin.service';
import RouteEnum, { productRoute } from '../../enums/route.enum';
import { PRODUCT_COLUMNS } from './ProductsColumns';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState('');
  const { query, search, onChangePage, onSearch, onSortChange } = useListQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data, isLoading } = useGetProductsQuery({ ...query, categoryId: categoryId || undefined });

  if (isLoading) return <Loader />;

  const tabs = [{ value: '', label: 'All' }, ...categories.map(({ id, name }) => ({ value: id, label: name }))];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Products <span className="font-normal text-gray-500">({data?.totalCount ?? 0})</span>
        </h1>
        <Button onClick={() => navigate(RouteEnum.PRODUCT_NEW)}>
          <Plus className="mr-2 h-5 w-5" />
          Add product
        </Button>
      </div>
      <Tabs
        options={tabs}
        value={categoryId}
        onChange={(value) => {
          setCategoryId(value);
          onChangePage('1');
        }}
      />
      <DataTable
        data={data?.data ?? []}
        columns={PRODUCT_COLUMNS}
        totalCount={data?.totalCount ?? 0}
        search={search}
        onSearch={onSearch}
        onChangePage={onChangePage}
        onSortChange={onSortChange}
        onRowClick={(product) => navigate(productRoute(product.id))}
      />
    </div>
  );
};

export default ProductsPage;
