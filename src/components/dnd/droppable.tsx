import { useDroppable } from '@dnd-kit/core';
import * as React from 'react';

type DraggableProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  data?: any;
};

export default function Droppable(props: DraggableProps) {
  const { setNodeRef } = useDroppable({
    id: props.id,
    data: props.data,
    disabled: !!props.disabled,
  });

  const style = {
    touchAction: 'none',
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={props.className}
      aria-describedby={`DndDescribedBy-${props.id}`}
    >
      {props.children}
    </div>
  );
}
