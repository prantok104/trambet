import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useField } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordField = ({ label = "", ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group>
      {label ?? (
        <Form.Label htmlFor={props.id || props.name}>
          {label}
          {props.required && `*`}
        </Form.Label>
      )}
      <div className="input-group">
        <Form.Control
          id={props.id || props.name}
          {...field}
          type={showPassword ? "text" : "password"}
          isInvalid={meta.touched && meta.error}
        />
        <div className="input-group-append">
          <button
            className="df-btn password-eye"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {meta.touched && meta.error ? (
          <Form.Control.Feedback type="invalid">
            {meta.error}
          </Form.Control.Feedback>
        ) : null}
      </div>
    </Form.Group>
  );
};

export default PasswordField;
