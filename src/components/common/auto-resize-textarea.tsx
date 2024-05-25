'use client';
import { cw } from '@/utils/tailwind/utils';
import React from 'react';

type AutoResizeTextareaProps = React.ComponentProps<'textarea'>;

export default function AutoResizeTextarea({ className, ...props }: AutoResizeTextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    const resizeTextarea = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    resizeTextarea();
  }, [props.value, props.defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange?.(e);
  };

  return (
    <textarea
      ref={textareaRef}
      onChange={handleChange}
      className={cw(
        'w-full p-2 border-1 border-slate-400 focus:border-yellow-700 rounded-md focus:outline-none resize-none overflow-hidden',
        className,
      )}
      rows={1}
      placeholder="Start typing here..."
      {...props}
    />
  );
}
