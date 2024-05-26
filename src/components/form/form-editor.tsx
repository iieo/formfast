'use client';
import { dbUpdateFormContent } from '@/db/functions/form';
import { Form } from '@/db/types';
import { FormField } from '@/forms/forms';
import useAutosave from '@/utils/hooks/useAutosave';
import { cw } from '@/utils/tailwind/utils';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { BellIcon, MixIcon, PlusIcon, TimerIcon } from '@radix-ui/react-icons';
import React from 'react';
import Header from '../common/header';
import Droppable from '../dnd/droppable';
import SortableDraggable from '../dnd/sortable-draggable';
import { useFieldSensors } from '../dnd/useFieldSensors';
import AddFormFieldDraggable from './add-form-field-draggable';
import GenericFormField from './generic-form-field';

export default function FormEditor({ form }: { form: Form }) {
  const [selected, setSelected] = React.useState<FormField | null>(null);
  const [activeItem, setActiveItem] = React.useState<FormField | null>(null);
  const [formContent, setFormContent] = React.useState<FormField[]>(form.content);
  const sensors = useFieldSensors();
  useAutosave({
    interval: 1000,
    data: formContent,
    onSave: async (data) => {
      await dbUpdateFormContent(form.id, data);
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const data = active.data.current as { type: string; field: FormField };

    if (data.type === 'add-form-field' && over !== null) {
      const overData = over.data.current as { index: number };
      const overIndex = overData.index;
      console.log(overIndex);

      setActiveItem(null);
      setFormContent((content) => {
        const newContent = [...content];
        newContent.splice(overIndex + 1, 0, data.field);
        return newContent;
      });
    } else {
      const { active, over } = event;
      if (active.data.current) {
      }

      if (over !== null && active.id !== over.id) {
        setFormContent((items) => {
          return arrayMove(items, Number(active.id), Number(over.id));
        });
      }
    }
  }
  function handleDragStart(event: DragEndEvent) {
    const { active } = event;
    const data = active.data.current as { type: string; field: FormField };

    if (data.type === 'add-form-field') {
      setActiveItem(data.field);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
      <Header title="Edit Form" />

      <div className="flex h-[calc(100dvh-4rem)]">
        <div className="flex flex-col text-white min-w-[15rem] bg-main-800 items-center ">
          <AddFormFieldDraggable
            id="add-headline"
            title="Headline"
            icon={<TimerIcon />}
            formField={{ required: false, type: 'heading', title: 'Title', subtitle: 'Subtitle' }}
          />
          <AddFormFieldDraggable
            id="add-short-input"
            title="Short Input"
            icon={<MixIcon />}
            formField={{
              required: false,
              type: 'short-text',
              label: 'Your question?',
              sublabel: 'Sublabel',
            }}
          />
          <AddFormFieldDraggable
            id="add-submit"
            title="Submit"
            icon={<BellIcon />}
            formField={{
              required: false,
              type: 'submit',
              buttonText: 'Submit',
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center p-12 flex-grow overflow-y-auto">
          <div className="rouded bg-main-800 w-full max-w-[50rem] p-4 flex flex-col gap-2">
            <SortableContext
              items={formContent.map((_, index) => index.toString())}
              strategy={verticalListSortingStrategy}
            >
              {formContent.map((item, index) => (
                <>
                  <SortableDraggable
                    id={index.toString()}
                    key={index}
                    data={{ type: 'form-field', formField: item }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className={cw(selected === item && 'bg-main-700 ', 'w-full')}
                    >
                      <GenericFormField
                        key={index}
                        content={item}
                        setField={(field) =>
                          setFormContent((content) => {
                            const newContent = [...content];
                            newContent[index] = field;
                            return newContent;
                          })
                        }
                      />
                    </button>
                  </SortableDraggable>
                  {activeItem ? (
                    <Droppable
                      id={index.toString()}
                      key={index + 'droppable'}
                      className="bg-main-700 py-2 flex items-center"
                      data={{ index }}
                    >
                      <div className="flex-1 h-[1px] bg-main-600" />
                      <div className="border border-main-600 rounded-full p-2">
                        <PlusIcon className="text-white" />
                      </div>
                      <div className="flex-1 h-[1px] bg-main-600" />
                    </Droppable>
                  ) : (
                    <div key={index + 'spacer'} className="py-6" />
                  )}
                </>
              ))}
            </SortableContext>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
