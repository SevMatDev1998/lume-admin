import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'dangerSolid';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            'bg-bice-blue text-white hover:bg-bice-blue-dark focus:ring-bice-blue': variant === 'primary',
            'bg-white text-gray-700 hover:bg-alice-blue hover:border-blizzard-blue border border-gray-300 focus:ring-bice-blue': variant === 'secondary',
            'bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 focus:ring-red-500': variant === 'danger',
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'dangerSolid',
          },
          {
            'px-2.5 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-sm': size === 'md',
            'px-6 py-3 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);