import React from 'react';
import './TweetText.css';

function TweetText(props){
    return(
        <p className='tweet'>{props.tweet.text}</p>
    );
}

export default TweetText;