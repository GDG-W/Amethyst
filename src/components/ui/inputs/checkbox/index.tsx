import Checkmark from "@/components/icons/checkmark";

type CheckboxProps = {
  name: string;
  label?: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
          className={`${checked ? "transparent" : "bg-soft-200 p-[1.5px] rounded-[4px] size-4"}`}
        >
          <div
            className={`flex items-center justify-center
              ${checked ? "bg-away-base shadow-checked size-4 rounded-[4px]" : "bg-white shadow-unchecked size-[13px] rounded-[2.6px]"}
            `}
          >
            {checked && <Checkmark color='white' className='size-2' />}
          </div>
        </div>
        {label && <span className='label-3 text-strong-950'>{label}</span>}
      </label>
    </div>
  );
}
