import React, { useState } from "react";
import "./App.css";
import FormInput from "./FormInput";

function App() {
  const [linkStatus, setlinkStatus] = useState("blank");
  function changeLinkStatus(params) {
    const newStatus = params; // do computation here
    setlinkStatus(newStatus);
    console.log(newStatus);
  }
  function displayContent(params) {
    let content;
    if (linkStatus === "blank") {
      content = <FormInput onSubmit={changeLinkStatus} />;
    } else if (linkStatus === "bad") {
      content = <h1>Bad link!</h1>;
    } else {
      content = <h1>Tweets!</h1>;
    }
    return content;
  }
  return (
    <div className="App">
      <header className="App-header">Twitter Threader</header>
      {displayContent()}
    </div>
  );
}

export default App;
