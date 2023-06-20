
import { Link } from "react-router-dom";
import "./AccountBtn.css";

function AccountBtn({ isSideMenu, onClose }) {
  return (
    <Link
      to="/profile"
      onClick={onClose}
      className={`account ${
        isSideMenu ? "account_place_side-menu" : "account_hidden"
      } hover-button`}
    >
      Аккаунт
    </Link>
  );
}

export default AccountBtn;