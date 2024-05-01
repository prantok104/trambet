import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';

const SelectField = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = selectedOption => {
    helpers.setValue(selectedOption);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#090F1E' : '#090F1E',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null,
      '&:hover': {
        borderColor: state.isFocused ? '#090F1E' : '#090F1E',
      },
    }),
  };

  return (
    <div>
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
        {props.required ? "*" : ""}
      </label>
      <Select
        className="custom-field"
        defaultValue={options[0]}
        options={options}
        {...field}
        {...props}
        onChange={handleChange}
        styles={customStyles}
      />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectField;
