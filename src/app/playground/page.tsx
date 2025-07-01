// app/playground/page.tsx

import ButtonPlayground from "@/components/playground/button.playground";
import InputPlayground from "@/components/playground/input.playground";

const ExampleInputs = () => (
  <div className='space-y-6'>
    <div className='space-y-2'>
      <h4 className='text-sm text-gray-500'>Default (without label)</h4>
      <input
        type='text'
        placeholder='Enter text here'
        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>

    <div className='space-y-2'>
      <h4 className='text-sm text-gray-500'>With Label (required)</h4>
      <label className='block text-sm font-medium text-gray-700'>First Name *</label>
      <input
        type='text'
        placeholder='Enter your first name'
        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>

    <div className='space-y-2'>
      <h4 className='text-sm text-gray-500'>With Helper Text</h4>
      <label className='block text-sm font-medium text-gray-700'>Username</label>
      <input
        type='text'
        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>
  </div>
);

export default function PlaygroundPage() {
  return (
    <div className='min-h-screen bg-[#f7f6f0]'>
      <div className='w-[80%] mx-auto max-w-7xl py-6 flex flex-col gap-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-extrabold text-static-black'>Design System</h1>

          <div className='flex gap-2'>
            <button className='px-4 py-2 bg-black text-white rounded-lg text-sm flex items-center gap-2'>
              Small Flyout ✨
            </button>
            <button className='px-4 py-2 bg-black text-white rounded-lg text-sm flex items-center gap-2'>
              Medium Flyout ✨
            </button>
            <button className='px-4 py-2 bg-black text-white rounded-lg text-sm flex items-center gap-2'>
              Large Flyout ✨
            </button>
          </div>
        </div>

        <ButtonPlayground />

        <InputPlayground />
      </div>
    </div>
  );
}
