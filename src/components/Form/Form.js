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
  return (
    <form
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