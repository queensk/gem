import React, { useContext, useState } from "react";
import "./ShowChart.css";
import UserChart from "../UserChart/UserChart";
import { AuthContext } from "../../UseContext/UseAuth/UseAuth";
import api from "../../api/api";

// Define the props type for the component
type ChartThreadProps = {
  user: {
    UserID: string;
    Username: string;
    ProfilePicture: string | null;
    Biography: string | null;
  } | null;
  messages: {
    MessageID: string;
    SenderID: string;
    ReceiverID: string;
    Text: string;
    Time: string;
  }[];
};

export default function ChartThread(props: ChartThreadProps) {
  const { user, messages } = props;
  const [inputValue, setInputValue] = useState("");
  const [currentMessages, setCurrentMessages] = useState(messages);
  const { state } = useContext(AuthContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue) {
      const data = {
        senderID: state.user?.userID,
        receiverID: user?.UserID,
        text: inputValue,
      };

      api
        .post(`/message/user`, data)
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="chart-thread">
      <UserChart user={user} />
      <div className="chart-thread-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chart-thread-message ${
              message.SenderID === state.user?.userID ? "right" : "left"
            }`}
          >
            <p>{message.Text}</p>
            <span>{message.Time}</span>
          </div>
        ))}
      </div>
      <form className="chart-thread-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
