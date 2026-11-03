import { PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

export const INPUT_CLASS =
  'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-bice-blue focus:outline-none focus:ring-1 focus:ring-bice-blue';

interface IFormField extends PropsWithChildren {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
}

export const FormField = ({ label, error, hint, className, children }: IFormField) => (
  <label className={cn('block space-y-1', className)}>
    {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
    {children}
    {hint && !error && <span className="block text-xs text-gray-400">{hint}</span>}
    {error && <span className="block text-xs text-red-600">{error}</span>}
  </label>
);
