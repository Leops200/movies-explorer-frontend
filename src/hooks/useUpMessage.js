// IMPORT PACKAGES
import { useContext } from "react";

// IMPORT CONTEXT
import { UpMessageContext } from "../context/UpMessageContext";

// IMPORT UTILS
import { generateKey } from "../components/utils/utils";

// USE NOTIFICATION HOOK
function useUpMessage() {
  const transmit = useContext(UpMessageContext);
  return (props) => {
    transmit({
      type: "ADD_MESSAGE",
      payload: {
        id: generateKey("note"),
        ...props,
      },
    });
  };
}

export default useUpMessage;
