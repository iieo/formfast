import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cw(...classNames: Array<any>) {
  return twMerge(clsx(classNames));
}
