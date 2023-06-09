import useValidation from "../utils/UseValidation";
import "./Login.css";
import AuthPoint from "../AuthPoint/AuthPoint";

function Login() {
  const { values, errors, isFormValid, onChange } = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="login">
      <AuthPoint
        title="Рады видеть!"
        name="login"
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
        buttonText="Войти"
      >
        <label className="form__input-wrapper">
          E-mail
          <input
            className={`form__input ${errors.email ? "form__input_style_error" : ""
              }`}
            type="email"
            name="email"
            form="login"
            required
            id="email-input"
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
            form="login"
            required
            minLength="6"
            maxLength="30"
            id="password-input"
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

export default Login;