import React from 'react';
import { useField } from 'formik';
import Form from 'react-bootstrap/Form';

const CheckboxField = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <Form.Group>
      <Form.Check
        type="checkbox"
        label={label}
        {...field}
        {...props}
        isInvalid={meta.touched && meta.error}
      />
      {meta.touched && meta.error ? (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default CheckboxField;
