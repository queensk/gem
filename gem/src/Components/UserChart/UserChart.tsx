import React from "react";
import "./UserChart.css";

// Define the user type for convenience
type User = {
  UserID: string;
  Username: string;
  ProfilePicture: string | null;
  Biography: string | null;
};

type UserChartProps = {
  user: User | null;
  handleMessages?: () => void;
};

export default function UserChart(props: UserChartProps) {
  const { user, handleMessages } = props;

  const handleClick = () => {
    if (handleMessages) {
      handleMessages();
    }
  };

  return (
    <div className="user-chart" onClick={handleClick}>
      <img
        src={
          user?.ProfilePicture
            ? user?.ProfilePicture
            : "https://www.w3schools.com/howto/img_avatar.png"
        }
        alt="Avatar"
      />
      <div className="user-chart-info">
        <h2>{user?.Username}</h2>
        {/* <p>{user.Biography}</p>
        <p>{user.UserID}</p> */}
      </div>
    </div>
  );
}
