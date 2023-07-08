import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { generateKey } from "../components/utils/utils";

function useNotification() {
  const dispatch = useContext(NotificationContext);
  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: generateKey("note"),
        ...props,
      },
    });
  };
}

export default useNotification;