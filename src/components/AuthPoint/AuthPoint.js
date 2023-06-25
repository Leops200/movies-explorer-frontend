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
  ...props
}) {
  return (
    <section className="auth-screen">
      <Logo place="auth" />
      <EntrTitle title={title} />
      <Form
        name={name}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        buttonText={buttonText}
      >
        {props.children}
      </Form>
      {name === "registr" ? (
        <p className="auth-screen__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="auth-screen__link hover-link">
            Войти
          </Link>
        </p>
      ) : (
        <p className="auth-screen__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="auth-screen__link hover-link">
            Регистрация
          </Link>
        </p>
      )}
    </section>
  );
}

export default AuthPoint;