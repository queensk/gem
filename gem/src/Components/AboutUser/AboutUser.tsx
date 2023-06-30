import React, { FC, useState } from "react";
import "./AboutUser.css";
import api from "../../api/api";
import { AuthContext } from "../../UseContext/UseAuth/UseAuth";
import MessagePopUp from "../MessagePopUp/MessagePopUp";

interface User {
  Biography: string | null;
  Email: string;
  ProfilePicture: string | null;
  UserID: string;
  Username: string;
}

interface AboutUserProps {
  user: User;
}

const AboutUser: FC<AboutUserProps> = ({ user }) => {
  if (!user) return null;
  const [isEditable, setIsEditable] = React.useState(false);
  const [editedBio, setEditedBio] = React.useState(user.Biography);
  const { state } = React.useContext(AuthContext);
  const [message, setMessage] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedBio(e.target.value);
  };

  const handleClick = () => {
    setIsEditable(!isEditable);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData = {
      biography: editedBio,
    };

    api
      .patch(`/users/${state.user?.userID}`, updateData)
      .then((_res) => {
        setMessage("Saved");
      })
      .catch((_err) => {
        setMessage("Error Updating");
      });
    setIsEditable(false);
  };

  return (
    <div className="about-container ">
      {message && <MessagePopUp message={message} setMessage={setMessage} />}
      <h2>About Us</h2>
      <div className="about-content">
        {isEditable ? (
          <form onSubmit={handleSubmit}>
            <textarea
              value={editedBio ?? ""}
              maxLength={650}
              onChange={handleChange}
            />
            <button className="save-button" type="submit">
              Save
            </button>
          </form>
        ) : (
          <div>
            <p>{editedBio}</p>
            <button className="edit-button" onClick={handleClick}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUser;
