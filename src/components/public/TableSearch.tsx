import { ChangeEvent, FC, useEffect, useState } from "react";

interface ISearch {
  placeholder?: string;
  type?: string;
  className?: string;
  onChange: (event: string) => void;
  search?: string,
}

const TableSearch: FC<ISearch> = ({ onChange, search='', placeholder = 'Search…', className = "", type = "text",  }) => {

  const [value, setValue] = useState<string>(search)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }


  useEffect(() => {
    setValue(search)
  }, [search])

  return (
    <div className={`  w-full ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        className="mb-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bice-blue"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TableSearch;
