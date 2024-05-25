'use client';
import React from 'react';
import * as RadixUISwitch from '@radix-ui/react-switch';

type SwitchProps = {
  id?: string;
  checked: boolean;
  onCheckedChange(): void;
};

export function Switch({ id, checked, onCheckedChange }: SwitchProps) {
  return (
    <form>
      <div className="flex items-center">
        <RadixUISwitch.Root
          className="w-[42px] h-[25px] rounded-full bg-main-200 relative outline-none cursor-default"
          id={id ?? 'airplane-mode'}
          style={
            {
              '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
            } as React.CSSProperties
          }
          checked={checked}
          onCheckedChange={onCheckedChange}
        >
          <RadixUISwitch.Thumb className="block w-[21px] h-[21px] bg-main-700 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </RadixUISwitch.Root>
      </div>
    </form>
  );
}
