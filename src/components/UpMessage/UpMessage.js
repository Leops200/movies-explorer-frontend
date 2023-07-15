import { useCallback, useEffect, useState } from "react";
import "./UpMessage.css";

function UpMessage({ transmit, noteId, type, message }) {
  //
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  function handleStartTimer() {
    const id = setInterval(() => {
      setWidth((prevState) => {
        if (prevState < 100) {
          return prevState + 0.5;
        }
        clearInterval(id);
        return prevState;
      });
    }, 10);
    setIntervalId(id);
  }

  const handleStopTimer = useCallback(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  const handleCloseMessage = useCallback(() => {
    handleStopTimer();
    setExit(true);
    setTimeout(() => {
      transmit({
        id: noteId,
        type: "REMOVE_MESSAGE",
      });
    }, 400);
  }, [handleStopTimer, transmit, noteId]);

  useEffect(() => {
    if (width === 100) {
      handleCloseMessage();
    }
  }, [width, handleCloseMessage]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      className={`upmessage ${exit ? "upmessage_action_exit" : ""}`}
      onMouseEnter={handleStopTimer}
      onMouseLeave={handleStartTimer}
    >
      <p className="upmessage__text">{message}</p>
      <div
        className={`upmessage__timer ${
          type === "OK"
            ? "upmessage__timer_type_success"
            : "upmessage__timer_type_error"
        }`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}

export default UpMessage;