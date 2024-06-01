import React, { useState } from 'react'
import { useField } from "formik";
import Form from "react-bootstrap/Form";
const RadioField = ({label, id, ...props}) => {
    const [field, meta] = useField({ ...props, type: "radio" });
  return (
    <Form.Check // prettier-ignore
      type="radio"
      label={label}
      id={id}
      {...field}
      {...props}
    />
  );
}

export default RadioField