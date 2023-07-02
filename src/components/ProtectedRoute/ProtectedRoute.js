import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ element: Component, ...props }) => {
    return props.logIn ? (
      <Component {...props} />
    ) : (
      <Navigate to="/" replace />
    );
  };
  
  export default ProtectedRoute;