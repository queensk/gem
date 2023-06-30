import { useEffect, useState, useContext } from "react";
import "./Profile.css";
import PasswordReset from "../../Components/PasswordReset/PasswordReset";
import EditBio from "../../Components/EditBio/EditBio";
import api from "../../api/api";
import { AuthContext } from "../../UseContext/UseAuth/UseAuth";

export default function Profile() {
  const [tab, setTab] = useState("personal");
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState<any>(null);
  const handleTab = (name: string) => {
    setTab(name);
  };

  const handleGetUser = (userId: string) => {
    api
      .get(`users/${userId}`)
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    state.user?.userID && handleGetUser(state.user?.userID);
  }, [state.user?.userID]);
  return (
    <div className="edit_profile-container">
      <div className="edit_profile-container_left">
        <div className="edit_profile-container_left_top">
          <h1>Account</h1>
          <ul>
            <li
              className={tab === "personal" ? "active" : ""}
              onClick={() => handleTab("personal")}
            >
              Personal Information
            </li>
            <li
              className={tab === "password" ? "active" : ""}
              onClick={() => handleTab("password")}
            >
              Password
            </li>
          </ul>
        </div>
      </div>
      {tab === "personal" ? <EditBio user={user} /> : <PasswordReset />}
    </div>
  );
}
