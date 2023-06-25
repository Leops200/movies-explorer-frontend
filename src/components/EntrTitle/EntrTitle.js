import "./EntrTitle.css";

function EntrTitle({ title, place }) {
  return (
    <h1
      className={`auth-title ${place === "edit-profile" ? "auth-title_place_edit-profile" : ""
        }`}
    >
      {title}
    </h1>
  );
}

export default EntrTitle;
