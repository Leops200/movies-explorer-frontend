import { useReducer } from "react";
import "./UpMessageControl.css";
import UpMessage from "../UpMessage";
import { UpMessageContext } from "../../../context/UpMessageContext";

function UpMessageProvider({ ...props }) {
  //
  const [state, transmit] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_MESSAGE":
        return [...state, { ...action.payload }];
      case "REMOVE_MESSAGE":
        return state.filter((item) => item.id !== action.id);
      default:
        return state;
    }
  }, []);

  return (
    <UpMessageContext.Provider value={transmit}>
      <div className="upmessage-provider">
        {state.map((note) => {
          return (
            <UpMessage
              key={note.id}
              transmit={transmit}
              noteId={note.id}
              type={note.type}
              message={note.message}
            />
          );
        })}
      </div>
      {props.children}
    </UpMessageContext.Provider>
  );
}

export default UpMessageProvider;