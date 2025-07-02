// app/playground/page.tsx

import { WandSparklesIcon } from "lucide-react";

import ButtonPlayground from "@/components/playground/button.playground";
import InputPlayground from "@/components/playground/input.playground";
import Button from "@/components/ui/button";

export default function PlaygroundPage() {
  return (
    <div className='min-h-screen bg-[#f7f6f0]'>
      <div className='w-[80%] mx-auto max-w-7xl py-6 flex flex-col gap-8'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-extrabold text-static-black'>Design System</h1>

          <div className='flex gap-2'>
            <Button variant='primary' className='bg-static-black text-sm px-7 font-medium w-auto'>
              Small Flyout
              <WandSparklesIcon className='h-3 w-3' />
            </Button>
            <Button variant='primary' className='bg-static-black text-sm px-7 font-medium w-auto'>
              Medium Flyout
              <WandSparklesIcon className='h-3 w-3' />
            </Button>
            <Button variant='primary' className='bg-static-black text-sm px-7 font-medium w-auto'>
              Large Flyout
              <WandSparklesIcon className='h-3 w-3' />
            </Button>
          </div>
        </div>

        <ButtonPlayground />

        <InputPlayground />
      </div>
    </div>
  );
}
