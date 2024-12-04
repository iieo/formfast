'use client';
import { FormFieldRow, FormRow, FormSubmissionRow } from '@/db/types';
import { read } from 'fs';
import React from 'react';

import Spreadsheet, { Matrix } from 'react-spreadsheet';

export default function FormSubmissionsView2({
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

  const getFieldName = (formField: FormFieldRow) => {
    const content = formField.content;
    switch (content.type) {
      case 'heading':
        return content.title;
      case 'short-text':
        return content.label;
      case 'submit':
        return 'Submit';
      default:
        return formField.id;
    }
  };

  const columns: { name: string; id: string }[] = formFields.map((formField) => {
    const name = getFieldName(formField);
    return { name, id: formField.id };
  });

  const [data, setData] = React.useState(
    submissions.map((submission) => {
      const submissionData = submission.data.reduce<{
        [key: string]: string | undefined;
      }>((acc, field) => {
        acc[field.formFieldId] = field.value;
        return acc;
      }, {});
      return formFields.map((formField) => {
        return submissionData[formField.id] === undefined
          ? undefined
          : {
              value: submissionData[formField.id],
            };
      });
    }),
  );

  const parseMatrixToData = (
    matrix: Matrix<{
      value: string | undefined;
    }>,
  ) => {
    return matrix.map((row) => {
      return row.map((cell) => {
        return cell;
      });
    });
  };

  return (
    <div className="overflow-auto">
      <Spreadsheet
        data={data}
        columnLabels={columns.map((column) => column.name)}
        darkMode={true}
        onChange={(data) => setData(parseMatrixToData(data))}
      />
    </div>
  );
}

/**
 * 
 * 
 *  const columnLabels = ["Flavour", "Food"];
  const rowLabels = ["Item 1", "Item 2"];
  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];
  return (
    <Spreadsheet
      data={data}
      columnLabels={columnLabels}
      rowLabels={rowLabels}
    />
  );
 */
