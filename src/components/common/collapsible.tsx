'use client';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import React from 'react';

const Collapsible = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  const [isOpen, toggle] = React.useReducer((open) => !open, false);

  return (
    <div className="border rounded w-full">
      <button
        onClick={toggle}
        className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-gray-300 focus:outline-none flex justify-between"
      >
        <p>{title}</p>
        <p>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</p>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[50vh]' : 'max-h-0'}`}
      >
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
