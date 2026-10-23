'use client';
import { FormFieldRow, FormSubmissionRow } from '@/db/types';
import React from 'react';

import Spreadsheet, { Matrix } from 'react-spreadsheet';

export default function FormSubmissionsView2({
  submissions,
  formFields,
}: {
  submissions: FormSubmissionRow[];
  formFields: FormFieldRow[];
}) {
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

  if (submissions.length === 0) {
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
