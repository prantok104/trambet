import React from 'react';
import { useField } from 'formik';
import Form from 'react-bootstrap/Form';

const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Form.Group>
      <Form.Label htmlFor={props.id || props.name}>
        {label}
        {props.required ? "*" : ""}
      </Form.Label>
      <Form.Control
        as="select"
        id={props.id || props.name}
        {...field}
        {...props}
        isInvalid={meta.error}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
      {meta.touched || meta.error ? (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default SelectField;
