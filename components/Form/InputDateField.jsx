import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";

const InputDateField = ({ label = "", ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group style={{ width: "100%" }}>
      {label ?? (
        <Form.Label htmlFor={props.id || props.name}>
          {label}
          {props.required ? `*` : ""}
        </Form.Label>
      )}
      <Form.Control
        id={props.id || props.name}
        type="date"
        {...field}
        {...props}
        isInvalid={meta.error}
      />
      {meta.touched || meta.error ? (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default InputDateField;
