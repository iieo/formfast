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
import { FormFieldProps } from '@/forms/forms';
import toast from 'react-hot-toast';
import { buttonClassName } from '@/utils/tailwind/button';
import { useFieldSensors } from '@/components/dnd/useFieldSensors';
import AddFormFieldDraggable from '@/components/form/add-form-field-draggable';
import Droppable from '@/components/dnd/droppable';
import GenericEditFormField from '@/components/form/generic-edit-form-field';
import SortableDraggable from '@/components/dnd/sortable-draggable';
import Header from '@/components/common/header';

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
  const [pendingDbOperations, setPendingDbOperations] = React.useState<boolean>(false);

  // Create a cache for form fields to avoid redundant API calls
  const formFieldCache = React.useRef(new Map());

  // Optimized autosave with debounce
  useAutosave({
    data: formContent,
    onSave: async (data) => {
      console.log(formContent.length, data.length);
      if (pendingDbOperations) return;

      setPendingDbOperations(true);
      try {
        await dbUpdateFormFields(data);
      } finally {
        setPendingDbOperations(false);
      }
    },
    interval: 1000,
  });

  // Memoized version of GenericEditFormField to prevent unnecessary re-renders
  const MemoizedGenericEditFormField = React.useMemo(
    () => React.memo(GenericEditFormField),
    []
  );


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

    if (!over) return;

    if (active.data.current?.type === 'add-form-field') {
      const overData = over.data.current as { index: number };
      const data = active.data.current as { type: string; field: FormFieldProps };
      const overIndex = overData.index;

      // Create a temporary ID for optimistic UI update
      const tempId = `temp-${Date.now()}`;
      const tempFormField = {
        id: tempId,
        formId: form.id,
        content: data.field,
        position: overIndex,
        createdAt: new Date(),
        updatedAt: new Date()
      } as FormFieldRow;

      // Optimistically update the UI
      setFormContent((items) => {
        const newItems = [...items];
        newItems.splice(overIndex, 0, tempFormField);
        return newItems;
      });

      // Check cache for similar field to speed up creation
      const cacheKey = `${form.id}-${JSON.stringify(data.field.type)}`;
      let cachedPromise = formFieldCache.current.get(cacheKey);

      try {
        // Perform the database operation in the background
        const newFormFieldRow = await dbCreateFormField({
          content: data.field,
          formId: form.id,
          position: overIndex,
        });

        if (newFormFieldRow) {
          // Replace the temporary item with the real one from the database
          setFormContent((items) => {
            return items.map(item => item.id === tempId ? newFormFieldRow : item);
          });
        } else {
          // Revert on failure
          toast.error("Failed to create form field");
          setFormContent((items) => items.filter(item => item.id !== tempId));
        }
      } catch (error) {
        console.error("Error creating form field:", error);
        toast.error("Failed to create form field");
        setFormContent((items) => items.filter(item => item.id !== tempId));
      }
    } else {
      const activeData = active.data.current as { index: number };
      const overData = over.data.current as { index: number };

      if (activeData.index !== overData.index) {
        // Optimistic update for reordering
        setFormContent((items) => {
          return arrayMove(items, activeData.index, overData.index);
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
      <div className="flex flex-col h-screen bg-main-900">
        <Header
          title="Edit Form"
          trailing={
            <button onClick={shareForm} className="flex items-center text-indigo-400 hover:text-indigo-300 px-3 py-2 transition-colors">
              <Share1Icon className="mr-2" />
              Share
            </button>
          }
        // className="bg-main-800 border-b border-main-700 px-6 h-14 flex items-center"
        />

        <div className="flex flex-1 h-[calc(100vh-3.5rem)]">
          {/* Left sidebar */}
          <div className="flex flex-col w-72 bg-main-800 border-r border-main-700 py-4 shadow-md">
            <div className="px-4 mb-4">
              <h2 className="text-sm font-medium text-gray-300">Add question</h2>
            </div>
            <div className="space-y-1 px-2">
              <AddFormFieldDraggable
                id="add-headline"
                title="Headline"
                icon={<TimerIcon className="text-indigo-400" />}
                formField={{ required: false, type: 'heading', title: 'Title', subtitle: 'Subtitle' }}
              // className="flex items-center px-3 py-3 rounded-md hover:bg-main-700 text-gray-200 cursor-pointer"
              />
              <AddFormFieldDraggable
                id="add-short-input"
                title="Short Input"
                icon={<MixIcon className="text-indigo-400" />}
                formField={{
                  required: false,
                  type: 'short-text',
                  label: 'Your question?',
                  sublabel: 'Sublabel',
                }}
              // className="flex items-center px-3 py-3 rounded-md hover:bg-main-700 text-gray-200 cursor-pointer"
              />
              <AddFormFieldDraggable
                id="add-submit"
                title="Submit"
                icon={<BellIcon className="text-indigo-400" />}
                formField={{
                  required: false,
                  type: 'submit',
                  buttonText: 'Submit',
                }}
              // className="flex items-center px-3 py-3 rounded-md hover:bg-main-700 text-gray-200 cursor-pointer"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center p-8 overflow-y-auto">
            <div className="w-full max-w-3xl mb-6">
              <div className="bg-indigo-800 text-white py-10 px-8 rounded-t-lg text-center">
                <h1 className="text-2xl font-semibold mb-2">{form.name || "Untitled Form"}</h1>
                <p className="text-indigo-200">Add questions from the left panel to create your form</p>
              </div>

              <div className="bg-main-800 rounded-b-lg shadow-md border border-main-700">
                <div className="min-h-[200px]">
                  {activeItem && (
                    <Droppable
                      id={'startitem'}
                      className="py-2 flex items-center justify-center my-2"
                      data={{ index: 0 }}
                    >
                      <div className="flex items-center w-full px-6">
                        <div className="flex-1 h-[1px] bg-main-600" />
                        <div className="mx-4 bg-main-700 rounded-full p-1 border border-main-600">
                          <PlusIcon className="text-indigo-400 h-5 w-5" />
                        </div>
                        <div className="flex-1 h-[1px] bg-main-600" />
                      </div>
                    </Droppable>
                  )}

                  <SortableContext
                    items={formContent.map((content) => content.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {formContent.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <SortableDraggable
                          id={item.id}
                          data={{ type: 'form-field', formField: item, index: index }}
                        >
                          <div
                            onClick={() => setSelected(item)}
                            className={cw(
                              "w-full relative mx-auto px-6 py-4 border-b border-main-700",
                              selected === item ? "bg-main-700" : "hover:bg-main-750",
                              "transition-colors cursor-pointer"
                            )}
                          >
                            <MemoizedGenericEditFormField
                              key={index}
                              formField={item}
                              setField={(field: any) =>
                                setFormContent((content) => {
                                  const newContent = [...content];
                                  newContent[index] = field;
                                  return newContent;
                                })
                              }
                            />
                            {selected === item && (
                              <div className="absolute top-2 right-4 flex space-x-2">
                                <button
                                  onClick={() => handleDelete(index, item)}
                                  className="p-1.5 rounded-full bg-main-800 border border-main-600 hover:bg-red-900 hover:border-red-800 transition-colors"
                                >
                                  <TrashIcon className="text-red-400 h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </SortableDraggable>
                        {activeItem != null && (
                          <Droppable
                            id={item.id + 'droppable'}
                            className="py-2 flex items-center justify-center"
                            data={{ index: index + 1 }}
                          >
                            <div className="flex items-center w-full px-6">
                              <div className="flex-1 h-[1px] bg-main-600" />
                              <div className="mx-4 bg-main-700 rounded-full p-1 border border-main-600">
                                <PlusIcon className="text-indigo-400 h-5 w-5" />
                              </div>
                              <div className="flex-1 h-[1px] bg-main-600" />
                            </div>
                          </Droppable>
                        )}
                      </React.Fragment>
                    ))}

                    {formContent.length === 0 && !activeItem && (
                      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
                        <div className="mb-4 bg-main-700 p-4 rounded-full border border-main-600">
                          <PlusIcon className="h-8 w-8 text-indigo-400" />
                        </div>
                        <p className="text-lg font-medium mb-1">Your form is empty</p>
                        <p className="max-w-sm">Drag questions from the left sidebar to start building your form</p>
                      </div>
                    )}
                  </SortableContext>
                </div>
              </div>
            </div>

            <button
              onClick={shareForm}
              className={cw(buttonClassName, "mt-6 bg-indigo-700 hover:bg-indigo-600 text-white rounded-md font-medium shadow-sm transition-colors flex items-center")}
            >
              <Share1Icon className="mr-2 h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </DndContext>
  );
}