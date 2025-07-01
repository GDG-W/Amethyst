import { ComponentSection } from "./component.section";
import { ComponentSubSection } from "./component.sub.section";

const InputPlayground = () => {
  return (
    <ComponentSection title='Inputs'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <ComponentSubSection title='Basic Inputs'>
          <ExampleInputs />
        </ComponentSubSection>

        <ComponentSubSection title='Input States'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <h4 className='text-sm text-gray-500'>Disabled</h4>
              <input
                type='text'
                placeholder='0.00'
                disabled
                className='w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed'
              />
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm text-gray-500'>Error State</h4>
              <label className='block text-sm font-medium text-gray-700'>Email *</label>
              <input
                type='email'
                placeholder='Enter valid email'
                className='w-full border border-red-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500'
              />
              <p className='text-sm text-red-600'>Email is required</p>
            </div>
          </div>
        </ComponentSubSection>

        <ComponentSubSection title='Textarea, Password & Select'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <h4 className='text-sm text-gray-500'>Textarea</h4>
              <label className='block text-sm font-medium text-gray-700'>Description *</label>
              <textarea
                placeholder='Enter description here'
                rows={4}
                className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <p className='text-sm text-gray-500'>Max 500 characters</p>
            </div>

            <div className='space-y-2'>
              <h4 className='text-sm text-gray-500'>Select</h4>
              <select className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option>Select field</option>
                <option>Customers</option>
              </select>
            </div>
          </div>
        </ComponentSubSection>
      </div>
    </ComponentSection>
  );
};

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

export default InputPlayground;
