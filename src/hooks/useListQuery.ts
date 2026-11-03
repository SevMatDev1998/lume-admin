import { useCallback, useState } from 'react';
import useQueryParam from './useQueryParam';
import useTableSort from './useTableSort';
import { useLazyDebounce } from './useDebounse';

const useListQuery = () => {
  const debounce = useLazyDebounce();
  const [page, setPage] = useState(useQueryParam('page') || '1');
  const [search, setSearch] = useState('');
  const { sort, onSortChange } = useTableSort();

  const onSearch = useCallback(
    (value: string) =>
      debounce(() => {
        setSearch(value);
        setPage('1');
      }, 500),
    [debounce],
  );

  return { query: { page, search, ...sort }, search, onChangePage: setPage, onSearch, onSortChange };
};

export default useListQuery;
