import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps } from 'react';

const button = cva(
  'inline-block rounded-md capitalize shadow-lg transition-all duration-75 ease-in-out',
  {
    variants: {
      intent: {
        primary:
          'bg-indigo-500 text-white border border-indigo-600 hover:bg-indigo-700 active:scale-95',
        secondary:
          'bg-gray-500 text-white border border-gray-600 hover:bg-gray-700 active:scale-95',
        success:
          'bg-green-500 text-white border border-green-600 hover:bg-green-700 active:scale-95',
        warning:
          'bg-yellow-500 text-white border border-yellow-600 hover:bg-yellow-700 active:scale-95',
        danger:
          'bg-red-500 text-white border border-red-600 hover:bg-red-700 active:scale-95',
        info: 'bg-blue-500 text-white border border-blue-600 hover:bg-blue-700 active:scale-95',
        ghost:
          'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-100 active:scale-95',
      },
      size: {
        sm: 'px-4 py-1.5 text-xs',
        md: 'px-5.5 py-2 text-sm',
        lg: 'px-7 py-2.5 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & {
    label?: string;
  };

const Button = ({
  label,
  children,
  intent,
  size,
  className,
  fullWidth,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(button({ intent, size, fullWidth }), className)}
    >
      {label || children}
    </button>
  );
};

Button.displayName = 'Button';

export { Button };
