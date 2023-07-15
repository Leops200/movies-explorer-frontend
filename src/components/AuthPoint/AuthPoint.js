import { Link } from "react-router-dom";
import "./AuthPoint.css";
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import EntrTitle from "../EntrTitle/EntrTitle";

function AuthPoint({
  title,
  name,
  onSubmit,
  isFormValid,
  buttonText,
  errServText,
  ...props
}) {
  return (
    <section className="auth-point">
      <Logo place="auth" />
      <EntrTitle title={title} />
      <Form
        name={name}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        buttonText={buttonText}
        errServText={errServText}
      >
        {props.children}
      </Form>
      {name === "registr" ? (
        <p className="auth-point__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="auth-point__link hover-link">
            Войти
          </Link>
        </p>
      ) : (
        <p className="auth-point__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="auth-point__link hover-link">
            Регистрация
          </Link>
        </p>
      )}
    </section>
  );
}

export default AuthPoint;