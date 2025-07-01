import { ComponentSection } from "./component.section";
import { ComponentSubSection } from "./component.sub.section";

const ButtonPlayground = () => {
  return (
    <ComponentSection title='Buttons'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <ComponentSubSection title='Primary Buttons'>
          <ExampleButtons />
        </ComponentSubSection>

        <ComponentSubSection title='Outline & Danger Buttons'>
          <ExampleOutlineButtons />
        </ComponentSubSection>

        <ComponentSubSection title='Other Variants'>
          <ExampleOtherButtons />
        </ComponentSubSection>
      </div>
    </ComponentSection>
  );
};
const ExampleButtons = () => (
  <div className='space-y-2'>
    <h4 className='text-sm text-gray-500'>Loading</h4>
    <button className='bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2'>
      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
    </button>
  </div>
);

const ExampleOutlineButtons = () => (
  <div className='space-y-2'>
    <h4 className='text-sm text-gray-500'>Outline with icon</h4>
    <button className='border border-gray-300 text-gray-700 px-6 py-3 rounded-lg flex items-center gap-2'>
      Export Selected Orders ↓
    </button>
  </div>
);

const ExampleOtherButtons = () => (
  <div className='space-y-2'>
    <h4 className='text-sm text-gray-500'>Ghost with left icon</h4>
    <button className='text-red-500 flex items-center gap-2'>🗑️ Delete Selected Items</button>
  </div>
);

export default ButtonPlayground;
