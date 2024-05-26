import { useSensor, useSensors } from '@dnd-kit/core';
import { MouseSensor, TouchSensor } from './sensors';

export function useFieldSensors() {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
}
