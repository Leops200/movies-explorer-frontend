import { useCallback, useState } from "react";

function useValidation() {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);
  // изменение ввода
  function onChange(e) {
    const { name, value } = e.target;
    const error = e.target.validationMessage;
    const formValid = e.target.closest("form").checkValidity();
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: error }));
    setFormValid(formValid);
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