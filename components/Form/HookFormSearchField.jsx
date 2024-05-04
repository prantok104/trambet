import { useFormContext, Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import Select from "react-select";

const HookFormSearchField = ({ label = "", name, options, className = "", required = false, labelField, valueField }) => {
    const { control } = useFormContext();

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#090F1E' : '#090F1E',
            boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null,
            '&:hover': {
                borderColor: state.isFocused ? '#090F1E' : '#090F1E',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black', // Adjust text color
        }),
    };

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
                render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                        id={name}
                        value={options.find(option => option[valueField] === value)}
                        onChange={onChange}
                        onBlur={onBlur}
                        options={options.map(option => ({ value: option[valueField], label: option[labelField] }))}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder=""
                        styles={customStyles}
                        isClearable
                    />
                )}
            />
        </Form.Group>
    );
}

export default HookFormSearchField;
