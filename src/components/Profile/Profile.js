
import { useEffect, useState } from "react";
import "./Profile.css";
import useValidation from "../utils/UseValidation";
import Form from "../Form/Form";
import EntrTitle from "../EntrTitle/EntrTitle";

function Profile({ user }) {

  const [isEditingBegun, setEditingStatus] = useState(false);
  const { values, errors, isFormValid, onChange, resetValidation } = useValidation();

  function handleEditClick() {
    setEditingStatus(!isEditingBegun);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    resetValidation(true, user);
  }, [resetValidation, user]);

  return (
    <main className="profile">
      <section className="profile__wrapper">
        <EntrTitle title={`Привет, ${user.name}!`} place="edit-profile" />
        <Form
          name="edit-profile"
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          buttonText="Сохранить"
          isEditingBegun={isEditingBegun}
        >
          <label className="form__input-wrapper form__input-wrapper_type_edit-profile">
            Имя
            <input
              className={`form__input form__input_type_edit-profile ${errors.name ? "form__input_style_error" : ""
                }`}
              type="text"
              name="name"
              form="edit-profile"
              required
              minLength="2"
              maxLength="30"
              id="name-input"
              disabled={isEditingBegun ? false : true}
              onChange={onChange}
              value={values.name || ""}
            />
          </label>
          <label className="form__input-wrapper form__input-wrapper_type_edit-profile">
            E-mail
            <input
              className={`form__input form__input_type_edit-profile ${errors.email ? "form__input_style_error" : ""
                }`}
              type="email"
              name="email"
              form="edit-profile"
              required
              id="email-input"
              disabled={isEditingBegun ? false : true}
              onChange={onChange}
              value={values.email || ""}
            />
          </label>
          <div
            className={`form__errors-wrapper ${errors.name || errors.email ? "form__errors-wrapper_active" : ""
              }`}
          >
            <div className="form__error-wrapper">
              <p
                className={`form__error-name ${errors.name ? "form__error-name_active" : ""
                  }`}
              >
                Имя:
              </p>
              <span
                className={`form__input-error form__input-error_type_edit-profile ${errors.name ? "form__input-error_active" : ""
                  }`}
              >
                {errors.name || ""}
              </span>
            </div>
            <div className="form__error-wrapper">
              <p
                className={`form__error-name ${errors.email ? "form__error-name_active" : ""
                  }`}
              >
                E-mail:
              </p>
              <span
                className={`form__input-error form__input-error_type_edit-profile ${errors.email ? "form__input-error_active" : ""
                  }`}
              >
                {errors.email || ""}
              </span>
            </div>
          </div>
        </Form>
        <div
          className={`profile__actions-wrapper ${isEditingBegun ? "profile__actions-wrapper_hidden" : ""
            }`}
        >
          <button
            className="profile__btn-action profile__btn-action_type_edit hover-link"
            type="button"
          >
            Редактировать
          </button>
          <button
            className="profile__btn-action profile__btn-action_type_exit hover-link"
            type="button"
            onClick={handleEditClick}
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;