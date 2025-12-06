import type { ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

// #region Star
const Star = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      viewBox='0 0 20 20'
      className={cn(
        'star animate-star-twinkle size-3 fill-white opacity-0 transition-all duration-400 [animation-delay:0.2s]',
        className
      )}
    >
      <path d='M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z'></path>
    </svg>
  );
};

// #region Cloud
const Cloud = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      viewBox='0 0 16 16'
      className={cn(
        'cloud animate-cloud-move w-[3.5em] fill-white opacity-100 transition-all duration-400',
        className
      )}
    >
      <path
        transform='matrix(.77976 0 0 .78395-299.99-418.63)'
        d='m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 
            0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 
            0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 
            0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 
            0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925'
      />
    </svg>
  );
};

// #region T2
export const Switch = ({
  type,
  className,
  ...props
}: ComponentProps<'input'>) => {
  return (
    <label className='relative block h-9.5 w-18 rounded-[30px] text-[17px] shadow-[-2px_3px_5px_0px_#2a2a2a] dark:shadow-[-2px_3px_12px_0px_#a4a4a4]'>
      {/* HIDDEN CHECKBOX */}
      <input type='checkbox' className='peer sr-only' {...props} />

      {/* SLIDER */}
      <div className='absolute inset-0 cursor-pointer overflow-hidden rounded-[30px] bg-[#00a6ff] transition-all duration-400 peer-checked:bg-[#2a2a2a] peer-checked:[&>.cloud]:translate-y-0 peer-checked:[&>.cloud]:opacity-0 peer-checked:[&>.star]:opacity-100 peer-checked:[&>.thumb]:translate-x-6 peer-checked:[&>.thumb]:shadow-[inset_-8px_-4px_0px_0px_#fff]'>
        {/* 🌙 or ☀️ THUMB */}
        <span className='thumb absolute top-1/2 left-[19px] size-5.5 -translate-1/2 rounded-[20px] shadow-[inset_15px_-4px_0px_15px_#ffcf48] transition-all duration-400 ease-[cubic-bezier(0.81,-0.04,0.38,1.5)]' />
        {/* shadow-[inset_15px_-4px_0px_15px_#ffcf48] */}

        {/* ⭐ STARS NOW ON THE LEFT */}
        <Star className='absolute top-px left-7 size-5' />
        <Star className='absolute top-1.5 left-3.5 size-4' />
        <Star className='absolute top-[22px] left-5.5 size-3' />
        <Star className='absolute top-4 left-2 size-2' />
        <Star className='absolute top-5 left-3.5 size-2' />

        {/* ☁ CLOUDS NOW ON THE RIGHT */}
        <Cloud className='absolute right-[-1em] bottom-[-1.3em] size-[3.5em] fill-gray-300 [--cloud-delay:0.7s]' />
        <Cloud className='absolute right-[-1.1em] bottom-[-1.5em] size-[3.4em] duration-200' />
      </div>
    </label>
  );
};
