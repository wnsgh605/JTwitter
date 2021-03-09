import React, { useEffect, useState } from "react";
import CRouter from "./Router";
import { fAuth } from "../firebase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(
    () =>
      fAuth.onAuthStateChanged((user) => {
        if (user) {
          setIsLoggedIn(true);
          setUserObj(user);
        } else {
          setIsLoggedIn(false);
        }
        setInit(true);
      }),
    []
  );

  return init ? (
    <CRouter isLoggedIn={isLoggedIn} userObj={userObj}></CRouter>
  ) : (
    "Initializing"
  );
}

export default App;
