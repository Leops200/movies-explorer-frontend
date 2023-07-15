import { useCallback, useState } from "react";
import emailValidator from "validator/es/lib/isEmail"

function useValidation() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);
  // изменение ввода
  function onChange(e) {
    const { value, name } = e.target;
    if (name === "name" && e.target.validity.patternMismatch) {
      e.target.setCustomValidity(
        "В имени не должно быть цифр и знаков (Исключение - дефис)."
      );
    } else if (name === "email" && !emailValidator(value)) {
      e.target.setCustomValidity(
        "Укажите e-mail в формате 'name@domain.zone'"
      );
    } else {
      e.target.setCustomValidity("");
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setFormValid(e.target.closest("form").checkValidity());
  }
  // сброс ошибки
  const resetValidation = useCallback(
    (isFormValid = false, values = {}, errors = {}) => {
      setFormValid(isFormValid);
      setValues(values);
      setErrors(errors);
    },
    [setFormValid, setValues, setErrors]
  );
  return {
    values,
    errors,
    isFormValid,
    onChange,
    resetValidation,
  };
}

export default useValidation;