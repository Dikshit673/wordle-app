const colorClasses = {
  green: 'bg-green-500 text-white',
  yellow: 'bg-yellow-400 text-white',
  gray: 'bg-gray-400/50',
  none: 'bg-white',
};

export type ColorKeysType = keyof typeof colorClasses;

type BoxProps = {
  color: keyof typeof colorClasses;
  letter: string;
};

const Box = ({ color, letter }: BoxProps) => {
  return (
    <div
      className={`flex size-12 items-center justify-center rounded-md border-2 text-xl font-bold uppercase ${colorClasses[color]} `}
    >
      {letter}
    </div>
  );
};

export default Box;
