import { useState, useEffect } from "react";

function Messages({ message }) {
  const [fullMessage, setFullMessage] = useState("");

  useEffect(() => {
    switch (message) {
      case "add-success":
        setFullMessage("New Book Successfully Added!");
        break;
      case "add-saving":
        setFullMessage("Saving New Book...");
        break;
      case "add-error":
        setFullMessage("Error Saving New Book!\n\nPlease fill out all fields.");
        break;
      case "rate-success":
        setFullMessage("Book Successfully Review!");
        break;
      case "rate-saving":
        setFullMessage("Saving New Review...");
        break;
      case "rate-error":
        setFullMessage(
          "Error Saving Book Review!\n\nPlease fill out all fields."
        );
        break;
      case "rate-error-book":
        setFullMessage(
          "Error Saving Book Review!\n\nPlease select a book to rate."
        );
        break;
      case "":
        setFullMessage("");
        break;
      default:
        setFullMessage("");
        break;
    }
  }, [message]);

  return <div className={message}>{fullMessage}</div>;
}

export default Messages;
