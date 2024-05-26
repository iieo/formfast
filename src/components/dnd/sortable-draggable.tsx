import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as React from 'react';

type SortableDraggableProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  data?: any;
};

export default function SortableDraggable(props: SortableDraggableProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
    disabled: !!props.disabled,
    data: props.data,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={props.className}
      aria-describedby={`DndDescribedBy-${props.id}`}
    >
      {props.children}
    </div>
  );
}
