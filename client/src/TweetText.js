import React from 'react';
import './index.css';

function TweetText(props){
    return(
        <div>
        <p style={{whiteSpace:'pre-wrap', textAlign:'left'}} className="first:text-xl text-left text-2xl md:text-center">{props.tweet.text}</p>
        <div className="flex flex-col sm:flex-col justify-items items-center">
            {
                props.tweet.images.map(img => (
                 <a href={img}  className="w-full justify-items items-center"><img src={img} alt="."></img></a>
                ))
            }
        </div>
        </div>
    );
}

export default TweetText;