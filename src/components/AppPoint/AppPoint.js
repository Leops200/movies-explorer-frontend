import { Outlet, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function AppPoint({ onHamburgerClick, logIn }) {

  const location = useLocation();

  return (
    <>
      <Header onHamburgerClick={onHamburgerClick} 
      logIn={logIn} />
      <Outlet />
      {location.pathname !== "/profile" && <Footer />}
    </>
  );
}

export default AppPoint;