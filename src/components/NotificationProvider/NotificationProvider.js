import { useReducer } from "react";
import "./NotificationsProvider.css";
import Notification from "../Notification/Notification";
import { NotificationContext } from "../../context/NotificationContext";

// NOTIFICATIONS PROVIDER COMPONENT
function NotificationProvider({ ...props }) {
  // HOOKS
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, { ...action.payload }];
      case "REMOVE_NOTIFICATION":
        return state.filter((item) => item.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className="notifications-provider">
        {state.map((note) => {
          return (
            <Notification
              key={note.id}
              dispatch={dispatch}
              noteId={note.id}
              type={note.type}
              message={note.message}
            />
          );
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;