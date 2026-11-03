import { useState } from 'react';

export interface TableSort {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const useTableSort = () => {
  const [sort, setSort] = useState<TableSort>({});

  return { sort, onSortChange: setSort };
};

export default useTableSort;
