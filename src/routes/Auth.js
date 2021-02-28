import React, { useState } from "react";
import { fAuth, firebaseInstance } from "../firebase";
import "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [missMatch, setMissMatch] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirm") {
      setConfirmPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let account;
    try {
      if (createAccount) {
        // create account
        if (password === confirmPassword) {
          account = await fAuth.createUserWithEmailAndPassword(email, password);
          setMissMatch(false);
        } else {
          setMissMatch(true);
          setConfirmPassword("");
        }
      } else if (!createAccount) {
        // log in
        account = await fAuth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const onClick = () => {
    setCreateAccount(!createAccount);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const socialOnClick = async (e) => {
    const {
      target: { name },
    } = e;
    console.log(name);
    // let token, user;
    if (name === "google") {
      await fAuth.signInWithPopup(
        new firebaseInstance.auth.GoogleAuthProvider()
      );
    } else if (name === "github") {
      await fAuth.signInWithPopup(
        new firebaseInstance.auth.GithubAuthProvider()
      );
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        {createAccount ? (
          <>
            <input
              name="confirm"
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={onChange}
            />
            {error ? (
              <span>{error}</span>
            ) : missMatch ? (
              <span>Incorrect Password</span>
            ) : null}
          </>
        ) : null}
        <button type="submit">
          {createAccount ? "Create Account" : "Log In"}
        </button>
      </form>
      <div>
        <button name="google" onClick={socialOnClick}>
          Google
        </button>
        <button name="github" onClick={socialOnClick}>
          Github
        </button>
        <button onClick={onClick}>
          {createAccount ? "have account?" : "you don't have an account?"}
        </button>
      </div>
    </div>
  );
}

export default Auth;
