import "./ServErrs.css";

function ServErrs({ place, errServText }) {
  return (
    <p
      className={`server-errors server-errors_place_${place}
      ${errServText ? "server-errors_active" : ""
        }`}
    >
      {errServText}
    </p>
  );
}

export default ServErrs;