import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useField, useFormikContext } from "formik";

const ImageInputField = ({ label = "", ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();
  const [preview, setPreview] = useState(null);
  const [mimeType, setMimeType] = useState("");

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue(field.name, file);
      setMimeType(file.type);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setMimeType("");
    }
  };

  return (
    <Form.Group style={{ width: "100%" }}>
      {label && (
        <Form.Label htmlFor={props.id || props.name}>
          {label}
          {props.required ? `*` : ""}
        </Form.Label>
      )}
      <Form.Control
        id={props.id || props.name}
        name={field.name}
        type="file"
        accept="image/*"
        onChange={handleChange}
        isInvalid={!!meta.error && meta.touched}
      />
      {meta.touched && meta.error ? (
        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      ) : null}
      {/* {preview && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
          />
          <p>File MIME type: {mimeType}</p>
        </div>
      )} */}
    </Form.Group>
  );
};

export default ImageInputField;
