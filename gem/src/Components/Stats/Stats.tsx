import React, { useContext, useEffect } from "react";
import { FaHeart, FaUserFriends } from "react-icons/fa";
import "./Stats.css";
import api from "../../api/api";
import { AuthContext } from "../../UseContext/UseAuth/UseAuth";

interface User {
  Biography: string | null;
  Email: string;
  ProfilePicture: string | null;
  UserID: string;
  Username: string;
}

interface Props {
  likes: number;
  followers: number;
  user: User;
}

const Stats: React.FC<Props> = ({ likes, followers, user }) => {
  const { state } = useContext(AuthContext);
  const [userFollower, setUserFollower] = React.useState<number>(followers);
  const [userLikes, setUserLikes] = React.useState<number>(likes);

  const handleLike = () => {
    const data = {
      likeID: state.user?.userID,
      likingID: user.UserID,
    };
    api
      .post(`/profileLike`, data)
      .then((_res) => {
        setUserLikes(userLikes === likes ? userLikes + 1 : userLikes - 1);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFollow = () => {
    const data = {
      followerID: state.user?.userID,
      followingID: user.UserID,
    };
    api
      .post(`/followers`, data)
      .then((_res) => {
        setUserFollower(
          userFollower === followers ? userFollower + 1 : userFollower - 1
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="stats">
      <div className="likes" onClick={handleLike}>
        <FaHeart />
        <span>{userLikes === 0 ? "" : userLikes}</span>
      </div>
      <div className="followers" onClick={handleFollow}>
        <FaUserFriends />
        <span>{userFollower === 0 ? "" : userFollower}</span>
      </div>
    </div>
  );
};

export default Stats;
