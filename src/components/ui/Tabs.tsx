import clsx from 'clsx';

export interface TabOption {
  value: string;
  label: string;
}

interface ITabs {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
}

const Tabs = ({ options, value, onChange }: ITabs) => (
  <div className="flex gap-2 border-b border-gray-200">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={clsx(
          '-mb-px border-b-2 px-4 py-2 text-sm transition-colors',
          option.value === value
            ? 'border-bice-blue font-medium text-bice-blue'
            : 'border-transparent text-gray-500 hover:text-gray-800'
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export default Tabs;
