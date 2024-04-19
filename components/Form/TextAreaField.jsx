import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";

const TextAreaField = ({ label = "", ...props }) => {
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
        as="textarea"
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

export default TextAreaField;
