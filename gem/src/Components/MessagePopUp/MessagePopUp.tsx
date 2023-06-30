import { FC } from "react";
import { BsXLg } from "react-icons/bs";
import "./MessagePopUp.css";

interface Props {
  message: string;
  setMessage: (message: string) => void;
}

const MessagePopUp: FC<Props> = ({ message, setMessage }) => {
  const handleClose = () => {
    setMessage("");
  };

  return (
    <div className="error-message">
      <p>{message}</p>
      <BsXLg onClick={handleClose} />
    </div>
  );
};

export default MessagePopUp;
