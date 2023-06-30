import React from "react";
import "./profile.css";

type User = {
  name: string;
  about: string;
  profile: string;
  rate: string;
};

type Props = {
  user: User;
};

const Profile: React.FC<Props> = ({ user }) => {
  return (
    <div className="profile">
      <div>
        <img src={user.profile} alt={user.name} />
      </div>
      <div className="profile_info">
        <div className="profile_info_name">
          <h1>{user.name}</h1>
          <p>{user.rate}</p>
        </div>
        <p>{user.about}</p>
      </div>
    </div>
  );
};

export default Profile;
