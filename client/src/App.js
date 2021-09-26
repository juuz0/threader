import React, { useState } from "react";
import "./App.css";
import FormInput from "./FormInput";
import TweetText from "./TweetText";

function App() {
  const [linkStatus, setlinkStatus] = useState("blank");
  const [tweets, setTweets] = useState([]);
  async function changeLinkStatus(params) {
    const newStatus = params; // do computation here
    fetch(`/getTweets?link=${params}`)
      .then((response) => response.json())
      .then((data) => setTweets(data))
      .catch((e) => setlinkStatus("bad"));

    console.log(newStatus);
  }
  function displayContent(params) {
    let content;
    if (linkStatus === "bad") {
      content = <h1>Bad link!</h1>;
    } else {
      content = (
        <div style={{ width: "42vw", margin: "auto" }}>
          {tweets.map((tweet) => (
            <TweetText tweet={tweet} />
          ))}
        </div>
      );
    }
    return content;
  }
  return (
    <div className="App">
      <header className="App-header">Twitter Threader</header>
      <FormInput onSubmit={changeLinkStatus} />
      {displayContent()}
    </div>
  );
}

export default App;
