import React, {useState} from 'react'
import Form from "react-bootstrap/Form";
const InputField = ({label="", type="text", name="", value='', ...otherProps}) => {
   const [data, setData] = useState(value);
   const nams = name;
  return (
    <Form.Group>
      <Form.Label htmlFor={name}>
        {label} {otherProps?.required ? "*" : ""}{" "}
      </Form.Label>
      <Form.Control
        type={type}
        id={name}
        value={data}
        name={name}
        onChange={(e) => setData(e.target.value)}
        {...otherProps}
         autoComplete={'off'}
      //   isValid={otherProps?.touched.name && !otherProps?.errors.name}
      //   isInvalid={otherProps?.errors.name}
      />
      {/* <Form.Control.Feedback type="invalid">
        {otherProps?.errors.name}
      </Form.Control.Feedback> */}
    </Form.Group>
  );
}

export default InputField