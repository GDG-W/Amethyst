import { DownloadIcon, LogInIcon, Trash2Icon, WandSparklesIcon } from "lucide-react";

import Button from "../ui/button";

import ComponentEntity from "./component.entity";
import { ComponentSection } from "./component.section";
import { ComponentSubSection } from "./component.sub.section";

const ButtonPlayground = () => {
  return (
    <ComponentSection title='Buttons'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <ComponentSubSection title='Primary Buttons'>
          {/* Loading Variant */}
          <ComponentEntity title='Loading'>
            <Button loading className='w-full'>
              Loading...
            </Button>
          </ComponentEntity>

          {/* Button with Icon Variant */}
          <ComponentEntity title='With Icon (right)'>
            <Button className='bg-static-black'>
              Create Account
              <WandSparklesIcon className='h-4 w-4' />
            </Button>
          </ComponentEntity>

          {/* Text Only Button Variant */}
          <ComponentEntity title='Text Only'>
            <Button className='bg-static-black'>Create Item</Button>
          </ComponentEntity>
        </ComponentSubSection>

        <ComponentSubSection title='Outline & Danger Buttons'>
          {/* Button Outline with Icon Variant */}
          <ComponentEntity title='Outline with Icon'>
            <Button
              variant='secondary'
              className='border-static-black text-static-black bg-transparent'
            >
              Export Selected Orders
              <DownloadIcon className='h-4 w-4' />
            </Button>
          </ComponentEntity>

          {/* Button Danger Variant */}
          <ComponentEntity title='Danger'>
            <Button variant='danger'>Delete</Button>
          </ComponentEntity>

          {/* Button Danger with Icon Variant */}
          <ComponentEntity title='Danger with Icon'>
            <Button variant='danger'>
              Delete
              <Trash2Icon className='h-4 w-4' />
            </Button>
          </ComponentEntity>
        </ComponentSubSection>

        <ComponentSubSection title='Other Variants'>
          {/* Ghost Button with Icon Variant */}
          <ComponentEntity title='Danger with Icon'>
            <Button variant='ghost' className='text-error-base '>
              <Trash2Icon className='h-4 w-4' />
              Delete Selected Items
            </Button>
          </ComponentEntity>

          {/* Primary Button with Custom Background Variant */}
          <ComponentEntity title='Primary with Custom background Color'>
            <Button variant='primary' className='bg-error-dark text-static-white'>
              Click Me
            </Button>
          </ComponentEntity>

          {/* Disabled Button Variant */}
          <ComponentEntity title='Disabled'>
            <Button variant='primary' disabled>
              Login
              <LogInIcon />
            </Button>
          </ComponentEntity>
        </ComponentSubSection>
      </div>
    </ComponentSection>
  );
};

export default ButtonPlayground;
