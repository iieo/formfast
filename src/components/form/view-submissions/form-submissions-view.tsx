'use client';
import { FormFieldRow, FormRow, FormSubmissionRow } from '@/db/types';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

export default function FormSubmissionsView({
  form,
  submissions,
  formFields,
}: {
  form: FormRow;
  submissions: FormSubmissionRow[];
  formFields: FormFieldRow[];
}) {
  const firstSubmission = submissions[0];
  if (firstSubmission === undefined) {
    return <div>No submissions</div>;
  }
  const columnHelper = createColumnHelper<{
    [key: string]: string | undefined;
  }>();
  const columns = firstSubmission.data.map((submission) => {
    return columnHelper.accessor(submission.formFieldId, {
      cell: (cell) => {
        return cell.getValue();
      },
    });
  });

  const data = submissions.map((submission) => {
    const row: { [key: string]: string | undefined } = {};
    submission.data.forEach((field) => {
      row[field.formFieldId] = field.value;
    });
    return row;
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getFieldName = (formFieldId: string) => {
    const formField = formFields.find((field) => field.id === formFieldId);
    if (formField === undefined) {
      return formFieldId;
    }
    const content = formField.content;
    switch (content.type) {
      case 'heading':
        return content.title;
      case 'short-text':
        return content.label;
      case 'submit':
        return 'Submit';
      default:
        return formFieldId;
    }
  };

  return (
    <div className="overflow-auto">
      <table className="text-white bg-main-800">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="pr-4 py-4 min-w-[15rem] max-w-[25rem] bg-main-700"
                    >
                      {getFieldName(header.id)}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="pr-4 py-4 border-t border-l">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
