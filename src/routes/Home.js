import React, { useEffect, useState } from "react";
import Tweet from "../components/Tweet";
import { fData } from "../firebase";

function Home({ userObj }) {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);
  useEffect(() => {
    fData.collection("Tweet").onSnapshot((snap) => {
      const textArray = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTexts(textArray);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await fData.collection("Tweet").add({
      text,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setText("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setText(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Write a post"
          value={text}
        />
        <button type="submit">JTweet</button>
      </form>
      <div>
        {texts.map((data) => {
          return (
            <Tweet
              key={data.id}
              text={data}
              isOwner={data.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
