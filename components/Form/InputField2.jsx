import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";
const InputField = ({ label = "", ...props }) => {
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
        register={props?.register}
        isInvalid={props.errormessage && props.errormessage}
      />
      {props.errormessage && props.errormessage ? (
        <Form.Control.Feedback type="invalid">
          {props.errormessage}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};

export default InputField;
