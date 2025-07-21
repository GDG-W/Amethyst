type CheckboxProps = {
  name: string;
  label?: string;
  checked: boolean;
  onChange: () => void;
};

export default function Checkbox({ name, label, checked, onChange }: CheckboxProps) {
  return (
    <div className='flex items-center gap-x-2'>
      <label htmlFor={name} className='inline-flex items-center cursor-pointer gap-x-2'>
        <input
          type='checkbox'
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className='peer sr-only'
        />
        <div
          className={`size-4 rounded-[3.5px] flex items-center justify-center 
            ${checked ? "bg-away-base shadow-[0_2px_2px_0_rgba(28,38,100,0.32)]" : "bg-white border border-soft-200 shadow-[0_2px_2px_0_rgba(27,28,29,0.12)]"}
          `}
        >
          {checked && (
            <svg className='size-3 text-white' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M17.089 1.171L7.910 13.265L2.500 7.832L0 10.335L8.333 18.703L20 3.667Z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>
        {label && <span className='label-3 text-unnamed-black'>{label}</span>}
      </label>
    </div>
  );
}
