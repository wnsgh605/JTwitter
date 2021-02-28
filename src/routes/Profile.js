import React from "react";
import { useHistory } from "react-router-dom";
import { fAuth } from "../firebase";

function Profile() {
  const history = useHistory();
  const logoutOnClick = () => {
    fAuth.signOut();
    history.push("/");
  };
  return (
    <div>
      <button onClick={logoutOnClick}>Log Out</button>
    </div>
  );
}

export default Profile;
