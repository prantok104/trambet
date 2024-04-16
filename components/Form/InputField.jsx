import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";
const InputField = ({ label = "", ...props }) => {
  console.log(props);
  const [field, meta] = useField(props);
  return (
    <Form.Group>
      {label ?? (
        <Form.Label htmlFor={props.id || props.name}>
          {label}
          {props.required ? `*` : ""}
        </Form.Label>
      )}
      <Form.Control
        id={props.id || props.name}
        {...field}
        {...props}
        isInvalid={props.errorMessage && props.errorMessage}
      />
      {props.errorMessage && props.errorMessage ? (
        <Form.Control.Feedback type="invalid">
          {props.errorMessage}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default InputField;
