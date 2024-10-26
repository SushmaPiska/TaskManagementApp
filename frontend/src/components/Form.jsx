import React from "react";
import styles from "./Form.module.css";

function FormField({ name, type, placeholder, value, onChange ,className}) {
  return (
    <>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
    </>
  );
}
function Form({ formFields, onSubmit, error, errorMessages }) {
  return (
    <>
      <form onSubmit={onSubmit}>
        {formFields.map((field, index) => (
          <div className={field.className}>
            <FormField
              value={field.value}
              onChange={field.onChange}
              key={index}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
            
            />
            {error[field.name] ? (
              <p>{errorMessages[field.name].message}</p>
            ) : null}
          </div>
        ))}
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default Form;
