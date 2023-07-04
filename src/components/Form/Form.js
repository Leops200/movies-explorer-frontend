import React, { useEffect, useRef } from "react";
import "./Form.css";
import ServErrs from "../ServErrs/ServErrs";

function Form({
  name,
  onSubmit,
  isFormValid,
  buttonText,
  isEditingBegun,
  ...props
}) { 

  const formRef = useRef(null);

  // Обработка события нажатия клавиши "ESC"
  useEffect(() => {
    const handleEscKeyPress = (event) => {
      if (event.key === "Escape") {
        formRef.current.reset();
        // Вернуться к кнопкам профиля
        // ...
      }
    };

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, []);

   // Обработка события клика вне формы
   useEffect(() => {
    const handleClickOutsideForm = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        formRef.current.reset();
        // Вернуться к кнопкам профиля
        // ...
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
      <ServErrs isEditingBegun={isEditingBegun} place={name} />
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