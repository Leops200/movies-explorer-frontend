import "./TripleBurger.css";
import Overlay from "../Overlay/Overlay";
import AccountBtn from "../AccountBtn/AccountBtn";
import NavBar from "../NavBar/NavBar";

function TripleBurger({ isSideMenuOpen, onClose }) {
  return (
    <Overlay isActive={isSideMenuOpen} onClose={onClose}>
      <div
        className={`tripleBurger-menu ${
          isSideMenuOpen ? "tripleBurger-menu_active" : ""
        }`}
      >
        <button
          className="tripleBurger-menu__btn-close hover-button"
          type="button"
          aria-label="Закрыть меню"
          onClick={onClose}
        ></button>
        <NavBar isSideMenu={true} onClose={onClose} />
        <AccountBtn isSideMenu={true} onClose={onClose} />
      </div>
    </Overlay>
  );
}

export default TripleBurger;