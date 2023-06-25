import "./ServErrs.css";

function ServErrs({ isEditingBegun, place }) {
  return (
    <p
      className={`server-errors server-errors_place_${place} ${isEditingBegun ? "server-errors_active" : ""
        }`}
    >
      {/* Пока нет связи с бэком , "жёсткая, длинная" ошибка*/}
      Ошибка авторизации. Токен не&nbsp;передан или передан
      не&nbsp;в&nbsp;том формате.
    </p>
  );
}

export default ServErrs;