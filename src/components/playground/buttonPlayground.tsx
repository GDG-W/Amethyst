import { DownloadIcon, LogInIcon, Trash2Icon, WandSparklesIcon } from "lucide-react";

import Button from "../ui/button";

import {
  ComponentCard,
  ComponentGrid,
  ComponentTitle,
  ComponentVariant,
  Section,
  SectionTitle,
  VariantLabel,
} from "./components";

const ButtonPlayground = () => {
  return (
    <Section>
      <SectionTitle>Buttons</SectionTitle>

      <ComponentGrid>
        {/* Primary Buttons */}
        <ComponentCard>
          <ComponentTitle>Primary Buttons</ComponentTitle>
          <ComponentVariant>
            <VariantLabel>Loading</VariantLabel>
            <Button loading variant='primary'>
              Click me
              <Trash2Icon className='h-4 w-4' />
            </Button>
          </ComponentVariant>
          <ComponentVariant>
            <VariantLabel>With icon (right)</VariantLabel>
            <Button variant='primary'>
              Create Account
              <WandSparklesIcon className='h-4 w-4' />
            </Button>
          </ComponentVariant>
          <ComponentVariant>
            <VariantLabel>Text only</VariantLabel>
            <Button variant='primary'>Create Item</Button>
          </ComponentVariant>
        </ComponentCard>

        {/* Outline & Danger Buttons */}
        <ComponentCard>
          <ComponentTitle>Outline & Danger Buttons</ComponentTitle>
          <ComponentVariant>
            <VariantLabel>Outline with icon</VariantLabel>
            <Button variant='secondary'>
              Export Selected Orders
              <DownloadIcon className='h-4 w-4' />
            </Button>
          </ComponentVariant>
          <ComponentVariant>
            <VariantLabel>Danger</VariantLabel>
            <Button variant='danger'>Delete</Button>
          </ComponentVariant>
          <ComponentVariant>
            <VariantLabel>Danger with icon</VariantLabel>
            <Button variant='danger'>
              Delete
              <Trash2Icon className='h-4 w-4' />
            </Button>
          </ComponentVariant>
        </ComponentCard>

        {/* Other Variants */}
        <ComponentCard>
          <ComponentTitle>Other Variants</ComponentTitle>
          <ComponentVariant>
            <VariantLabel>Ghost with left icon</VariantLabel>
            <Button variant='ghost'>
              <Trash2Icon className='h-4 w-4' />
              Delete Selected Items
            </Button>
          </ComponentVariant>
          <ComponentVariant>
            <VariantLabel>Primary with custom background color</VariantLabel>
            <Button variant='primary' className='text-white bg-[rgba(193, 86, 86, 1)]'>
              Click me
            </Button>
          </ComponentVariant>
          <ComponentVariant>
            <VariantLabel>Disabled</VariantLabel>
            <Button disabled variant='primary'>
              Login
              <LogInIcon className='h-4 w-4' />
            </Button>
          </ComponentVariant>
        </ComponentCard>
      </ComponentGrid>
    </Section>
  );
};

export default ButtonPlayground;
