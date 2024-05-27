'use client';
import {
  dbCreateFormField,
  dbDeleteFormById,
  dbDeleteFormFieldById,
  dbUpdateFormFields,
} from '@/db/functions/form';
import { FormFieldRow, FormRow } from '@/db/types';
import useAutosave from '@/utils/hooks/useAutosave';
import { cw } from '@/utils/tailwind/utils';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  BellIcon,
  MixIcon,
  PlusIcon,
  Share1Icon,
  TimerIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import Header from '../common/header';
import Droppable from '../dnd/droppable';
import SortableDraggable from '../dnd/sortable-draggable';
import { useFieldSensors } from '../dnd/useFieldSensors';
import AddFormFieldDraggable from './add-form-field-draggable';
import GenericEditFormField from './generic-edit-form-field';
import { FormField } from '@/forms/forms';
import toast from 'react-hot-toast';
import { buttonClassName } from '@/utils/tailwind/button';

export default function FormEditor({
  form,
  formFields,
}: {
  form: FormRow;
  formFields: FormFieldRow[];
}) {
  const [selected, setSelected] = React.useState<FormFieldRow | null>(null);
  const [activeItem, setActiveItem] = React.useState<FormFieldRow | null>(null);
  const [formContent, setFormContent] = React.useState<FormFieldRow[]>(formFields);
  const sensors = useFieldSensors();
  useAutosave({
    data: formContent,
    onSave: async (data) => {
      console.log(formContent.length, data.length);

      await dbUpdateFormFields(data);
    },
  });

  async function handleDelete(index: number, item: FormFieldRow) {
    await dbDeleteFormFieldById(item.id);
    setFormContent((content) => {
      const newContent = [...content];
      newContent.splice(index, 1);
      return newContent;
    });
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveItem(null);
    const { type } = active.data.current as { type: string };

    if (type === 'add-form-field' && over !== null) {
      const overData = over.data.current as { index: number };
      const data = active.data.current as { type: string; field: FormField };
      const overIndex = overData.index;
      const newFormFieldRow = await dbCreateFormField({
        content: data.field,
        formId: form.id,
        position: overIndex,
      });
      if (newFormFieldRow !== undefined) {
        //insert at index overindex
        setFormContent((items) => {
          const newItems = [...items];
          newItems.splice(overIndex, 0, newFormFieldRow);
          return newItems;
        });
      }
    } else {
      const { active, over } = event;
      const activeData = active.data.current as { index: number };
      const overData = over?.data.current as { index: number };

      if (over !== null && activeData.index !== overData.index) {
        setFormContent((items) => {
          return arrayMove(items, overData.index, activeData.index);
        });
      }
    }
  }
  function handleDragStart(event: DragEndEvent) {
    const { active } = event;
    const data = active.data.current as { type: string; field: FormFieldRow };

    if (data.type === 'add-form-field') {
      setActiveItem(data.field);
    }
  }

  async function shareForm() {
    const url = `${window.location.origin}/form/${form.id}`;
    await navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard');
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} sensors={sensors}>
      <Header
        title="Edit Form"
        trailing={
          <button onClick={shareForm}>
            <Share1Icon />
          </button>
        }
      />

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
        <div className="flex flex-col items-center p-12 flex-grow overflow-y-auto">
          <div className="rounded bg-main-800 w-full max-w-[50rem] p-4 flex flex-col gap-2">
            {activeItem ? (
              <Droppable
                id={'startitem'}
                className="bg-main-700 py-2 flex items-center"
                data={{ index: 0 }}
              >
                <div className="flex-1 h-[1px] bg-main-600" />
                <div className="border border-main-600 rounded-full p-2">
                  <PlusIcon className="text-white" />
                </div>
                <div className="flex-1 h-[1px] bg-main-600" />
              </Droppable>
            ) : (
              <div className="py-6" />
            )}
            <SortableContext
              items={formContent.map((content) => content.id)}
              strategy={verticalListSortingStrategy}
            >
              {formContent.map((item, index) => (
                <>
                  <SortableDraggable
                    id={item.id}
                    key={item.id}
                    data={{ type: 'form-field', formField: item, index: index }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className={cw(selected === item && 'bg-main-700 ', 'w-full relative')}
                    >
                      <GenericEditFormField
                        key={index}
                        formField={item}
                        setField={(field) =>
                          setFormContent((content) => {
                            const newContent = [...content];
                            newContent[index] = field;
                            return newContent;
                          })
                        }
                      />
                      {selected === item && (
                        <div className="absolute bottom-2 right-[50%] translate-x-[50%] text-white">
                          <button
                            onClick={() => handleDelete(index, item)}
                            className="p-2 rounded-full bg-red-900"
                          >
                            <TrashIcon className=" text-white h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </button>
                  </SortableDraggable>
                  {activeItem != null ? (
                    <Droppable
                      id={item.id + 'droppable'}
                      key={item.id + 'droppable'}
                      className="bg-main-700 py-2 flex items-center"
                      data={{ index: index + 1 }}
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
          <button onClick={shareForm} className={cw(buttonClassName, 'mt-12')}>
            <Share1Icon className="text-white" />
            <p className="text-white">Share</p>
          </button>
        </div>
      </div>
    </DndContext>
  );
}
