import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import * as React from 'react';

type DraggableProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  data?: any;
};

export default function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    disabled: !!props.disabled,
    data: props.data,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
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
