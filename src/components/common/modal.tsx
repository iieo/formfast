'use client';

import { useKeyboardPress, useOutsideClick } from '@/utils/hooks';
import { Cross1Icon } from '@radix-ui/react-icons';
import React from 'react';

type ModalProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  showCloseButton?: boolean;
  toggle(): void;
  key: string; // this should be a unique key for each modal wrapper component
};

/**
 * This is a reusable modal, be careful with sideeffects due to the `useKeyboardPress` hook.
 * If you have multiple modals with the same key (or without a key) on the same page
 * the toggles inside the useKeyboardPress hook will interact with each other. Therefore
 * you should provide a unique key element for your modals
 * https://react.dev/learn/rendering-lists#why-does-react-need-keys
 */
export default function Modal({ showCloseButton, title, children, open, toggle }: ModalProps) {
  const ref = useOutsideClick<HTMLDivElement>(() => toggle());
  useKeyboardPress(toggle, ['Escape']);

  if (!open) {
    return null;
  }

  return (
    <div>
      <div className="backdrop-blur-[2px] fixed inset-0 h-[100dvh] w-[100dvw] z-20 bg-main-300/70" />
      <div
        className="fixed z-30 top-[50%] left-[50%] max-w-[50rem] translate-x-[-50%] translate-y-[-50%]"
        ref={ref}
      >
        {showCloseButton && (
          <div className="flex justify-end mb-2">
            <button onClick={() => toggle()} className="hover:bg-gray p-1 bg-main-100 rounded-full">
              <Cross1Icon className="w-8 h-8" fill="black" />
            </button>
          </div>
        )}
        <div className="bg-white py-6 sm:px-12 rounded-lg px-20">
          <h3 className="w-full text-center text-xl font-bold text-main-600 p-4">{title}</h3>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
