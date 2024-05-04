import { FC } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { Form } from "react-bootstrap";

const HookFormCheckField = ({ label = "", name, className = "" }) => {
    const { control } = useFormContext()

    return (
        <Form.Group className={className}>
            <Form.Check
                style={{ margin: 0, minHeight: 0 }}
                label={label}
                name={name}
                id={name}
                as={Controller}
                control={control}
                defaultValue={false}
                render={({ field }) => (
                    <Form.Check
                        {...field}
                        type="checkbox"
                        id={name}
                    />
                )}
            />
        </Form.Group>
    )
};

export default HookFormCheckField;
