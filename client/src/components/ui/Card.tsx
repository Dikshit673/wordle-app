import { cn } from 'tailwind-variants';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-9/10 rounded-xl bg-white px-6 py-2 shadow-md md:px-8 dark:bg-gray-800',
        className
      )}
    >
      {children}
    </div>
  );
};
