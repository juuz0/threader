import React, { useState } from "react";
import "./App.css";
import FormInput from "./FormInput";
import TweetText from "./TweetText";

function App() {
  const [linkStatus, setlinkStatus] = useState("blank");
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState("");
  const [pfpUrl, setPfpUrl] = useState("");

  async function changeLinkStatus(params) {
    const newStatus = params; // do computation here
    fetch(`/getTweets?link=${params}`)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setPfpUrl(data.pfpUrl);
        setTweets(data.filteredResp);
        setlinkStatus("good");
      })
      .catch((e) => setlinkStatus("bad"));

    console.log(newStatus);
  }
  function displayContent(params) {
    let content;
    if (linkStatus === "blank") {
      content = (
        <div className="flex flex-col lg:flex-row w-screen h-screen justify-items items-center ">
          <div className="text-lg lg:text-6xl w-full jusitfy-items align-center font-mono">
            Thread 2 Article <br />
            <span className="text-sm lg:text-lg font-sans">
              Type a valid twitter URL in the text field and Thread.
            </span>
          </div>
          <FormInput onSubmit={changeLinkStatus} />
        </div>
      );
    } else if (linkStatus === "bad") {
      content = (<div className="w-screen h-screen justify-items items-center text-9xl"><span>F <br/> Wrong Link.</span></div>);
    } else {
      content = (
        <div>
          <header className="App-header">Thread 2 Article</header>
          <div className="p-6 md:container md:mx-auto mt-8 md:my-8 mx-auto shadow-xl flex flex-col flex-wrap text-left justify-center space-y-8 w-1/2 h-4/5 items-start border-2 border-gray-300 font-sans w-full sm:w-full lg:w-1/2">
            <div className="flex flex-row space-x-8 justify-center items-center">
              <img
                className="w-16 h-16 md:w-16 md:h-auto md:rounded-full rounded-full mx-auto items-center justify-center"
                src={pfpUrl}
                alt=""
              />
              <p className="text-xl font-mono">By {username}</p>
            </div>
            {tweets.map((tweet) => (
              <TweetText tweet={tweet} />
            ))}
          </div>
          <FormInput onSubmit={changeLinkStatus} />
        </div>
      );
    }
    return content;
  }
  return <div className="App">{displayContent()}</div>;
}

export default App;
