import React, { useEffect, useRef } from "react";
import "./Form.css";
import ServErrs from "../ServErrs/ServErrs";

function Form({ name, onSubmit, isFormValid, buttonText,
  errServText, isEditingBegun, ...props }) {
  const formRef = useRef(null);

  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        formRef.current.reset();
      }
    };

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideForm = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        formRef.current.reset();
      }
    };

    document.addEventListener("click", handleClickOutsideForm);

    return () => {
      document.removeEventListener("click", handleClickOutsideForm);
    };
  }, []);

  return (
    <form
      ref={formRef}
      action="#"
      name={`${name}`}
      id={`${name}`}
      className={`form form_type_${name}`}
      noValidate
      onSubmit={onSubmit}
    >
      {props.children}
      <ServErrs
        place={name}
        isEditingBegun={isEditingBegun}
        errServText={errServText} />
      <button
        type="submit"
        form={`${name}`}
        className={`form__btn-submit ${name === "edit-profile" && !isEditingBegun
          ? "form__btn-submit_hidden"
          : ""
          } hover-button`}
        disabled={isFormValid ? false : true}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default Form;