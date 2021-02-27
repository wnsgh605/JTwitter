import React, { useEffect, useState } from "react";
import CRouter from "./Router";
import { fAuth } from "../firebase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(
    () =>
      fAuth.onAuthStateChanged((user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setInit(true);
      }),
    []
  );

  return init ? <CRouter isLoggedIn={isLoggedIn}></CRouter> : "Initializing";
}

export default App;
