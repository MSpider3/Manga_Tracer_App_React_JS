interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  disabled?: boolean;
}

export function Select({ options, disabled = false }: SelectProps) {
  return (
    <select
      disabled={disabled}
      className={`
        block w-full rounded-lg border-2 bg-teal-800 px-3 py-2 text-sm text-white
        shadow-sm transition-colors duration-200 focus:border-amber-400 focus:outline-none
        focus:ring focus:ring-amber-400/20 ${
          disabled
            ? 'cursor-not-allowed border-teal-700 opacity-50'
            : 'border-teal-700 hover:border-teal-600'
        }
      `}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}