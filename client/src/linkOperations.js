import needle from "needle";

const token =
  "AAAAAAAAAAAAAAAAAAAAACbnTwEAAAAAi5lpAu76FoxUyjjoKxXtj0z5EZI%3DuRykufKzVgyuLlfXjsZMEiJCzNp7uKVRksY4keS3zhRM50VVPH";
// const link = "https://twitter.com/SkySportsNews/status/1441385906645225472";

async function getTweets(link) {
  const id = link.match("status/([0-9]+)*")[1];
  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
  try {
    const response = await getRequest(id, endpointUrl);
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}
// getTweets("https://twitter.com/Krishn_aGupta/status/1441755722409136132");
async function getResponse(endpointUrl, params) {
  const res = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

async function getUserFromTweetId(id) {
  const params = {
    ids: `${id}`,
    "tweet.fields": "author_id,in_reply_to_user_id",
    expansions: "author_id",
    "user.fields": "username",
  };
  const res = await getResponse("https://api.twitter.com/2/tweets", params);
  if (res.includes) {
    // console.log(res.includes.users[0]);
    return res.includes.users[0];
  } else {
    throw new Error("Bad link");
  }
}

async function getRequest(id, endpointUrl) {
  const user = await getUserFromTweetId(id);
  const username = user.username;
  const userid = user.id;
  console.log(username, userid);
  const params = {
    query: `from:${username} conversation_id:${id}`,
    "tweet.fields": "author_id,conversation_id,in_reply_to_user_id",
    max_results: 100,
  };
  const mParams = {
    ids: `${id}`,
    "tweet.fields": "author_id,conversation_id,in_reply_to_user_id",
  };
  let mainTweet = await getResponse(
    "https://api.twitter.com/2/tweets",
    mParams
  );
  mainTweet = mainTweet.data[0];
  const resp = await getResponse(endpointUrl, params);
  let filteredResp = resp.data.filter((response) => {
    return response.in_reply_to_user_id === userid;
  });
  filteredResp = [...filteredResp, mainTweet];
  filteredResp.reverse();
  filteredResp.forEach((element) => {
  //  var re = new RegExp(element, "https://t.co/.+\s");
    element.text.replace('https://t.co/rETQqTOc5t', 'kekw');
  });
  return filteredResp;
}

export default getTweets;
