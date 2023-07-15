import { useEffect } from "react";
import useValidation from "../../hooks/useValidation";
import "./Register.css";
//import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthPoint from "../AuthPoint/AuthPoint";
import { USER_NAME_REGEX } from "../utils/constants";

function Registr({ onRegister, onLoading, errServText,
  setErrServText, logIn }) {
  const { values, errors, isFormValid, onChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  useEffect(() => {
    setErrServText("");
  }, [setErrServText]);

  return logIn ? (<Navigate to="/" replace />) : (
    <main className="registr">
      <AuthPoint
        title="Добро пожаловать!"
        name="registr"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText={onLoading ? "Регистрация..." : "Зарегистрироваться"}
        errServText={errServText}
      >
        <label className="form__input-wrapper">
          Имя
          <input
            className={`form__input ${errors.name ? "form__input_style_error" : ""
              }`}
            type="text"
            name="name"
            form="registr"
            required
            minLength="2"
            maxLength="30"
            id="name-input"
            disabled={onLoading ? true : false}
            onChange={onChange}
            value={values.name || ""}
            pattern={USER_NAME_REGEX}
          />
          <span
            className={`form__input-error ${errors.name ? "form__input-error_active" : ""
              }`}
          >
            {errors.name || ""}
          </span>
        </label>
        <label className="form__input-wrapper">
          E-mail
          <input
            className={`form__input ${errors.email ? "form__input_style_error" : ""
              }`}
            type="email"
            name="email"
            form="registr"
            required
            id="email-input"
            disabled={onLoading ? true : false}
            onChange={onChange}
            value={values.email || ""}
          />
          <span
            className={`form__input-error ${errors.email ? "form__input-error_active" : ""
              }`}
          >
            {errors.email || ""}
          </span>
        </label>
        <label className="form__input-wrapper">
          Пароль
          <input
            className={`form__input ${errors.password ? "form__input_style_error" : ""
              }`}
            type="password"
            name="password"
            form="registr"
            required
            minLength="6"
            maxLength="30"
            id="password-input"
            disabled={onLoading ? true : false}
            onChange={onChange}
            value={values.password || ""}
          />
          <span
            className={`form__input-error ${errors.password ? "form__input-error_active" : ""
              }`}
          >
            {errors.password || ""}
          </span>
        </label>
      </AuthPoint>
    </main>
  );
}

export default Registr;