import React, { useEffect, useContext, useState } from "react";
import "./Messages.css";
import UserChart from "../../Components/UserChart/UserChart";
import ChartThread from "../../Components/ShowChart/ShowChart";
import api from "../../api/api";
import { AuthContext } from "../../UseContext/UseAuth/UseAuth";
import { MessageUserContext } from "../../UseContext/UseMessage/SearchMessageUser";

interface MessageUser {
  UserID: string;
  Username: string;
  ProfilePicture: string | null;
  Biography: string | null;
}

export default function Messages() {
  const [activeChartUsers, setActiveChartUsers] = useState<MessageUser[]>([]);
  const { state } = useContext(AuthContext);
  const { messageUser } = useContext(MessageUserContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeMessage, setActiveMessage] = useState<MessageUser | null>(null);

  const handleMessages = (user: MessageUser) => {
    api
      .get(`/message/user/${state.user?.userID}`)
      .then((res) => {
        setMessages(
          res.data.data.filter(
            (message: any) =>
              message.SenderID === user.UserID ||
              message.ReceiverID === user.UserID
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!messageUser) {
      api
        .get(`/message/user/${state.user?.userID}/sent`)
        .then((res) => {
          setActiveChartUsers(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (
      messageUser &&
      !activeChartUsers.some((user) => user.UserID === messageUser.UserID)
    ) {
      setActiveChartUsers([messageUser, ...activeChartUsers]);
    }
  }, [state.user?.userID, messageUser]);

  return (
    <div className="chart-container">
      <div className="chart-User-container">
        <div className="chart-User-container-inner">
          {activeChartUsers.length > 0 &&
            activeChartUsers.map((user, index) => (
              <UserChart
                key={index}
                user={user}
                handleMessages={() => {
                  handleMessages(user);
                  setActiveMessage(user);
                }}
              />
            ))}
        </div>
      </div>
      <div className="chart-message-container">
        <ChartThread user={messageUser ?? activeMessage} messages={messages} />
      </div>
    </div>
  );
}
