interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'danger';
  children: React.ReactNode;
}

export function Button({ variant = 'default', children, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-amber-400 text-teal-900 hover:bg-amber-500 focus:ring-amber-400',
    outline: 'border-2 border-teal-700 text-gray-300 hover:bg-teal-800 focus:ring-teal-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        props.disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
}