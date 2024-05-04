import { FC } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Form } from "react-bootstrap";

const HookFormInputField = ({ label = "", name, type = "text", className = "", required = false, remark = false }) => {
  const { control } = useFormContext()

  return (
    <Form.Group className={className}>
      {label && (
        <Form.Label htmlFor={name}>
          {label}
          {required && "*"}
        </Form.Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Form.Control
            id={name}
            type={type}
            {...field}
            isInvalid={false} // You can handle validation errors separately
          />
        )}
      />
      {remark && required && (
        <Form.Text className="text-red-500">* Required</Form.Text>
      )}
    </Form.Group>
  );
};

export default HookFormInputField;
