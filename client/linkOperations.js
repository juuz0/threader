import needle from "needle";

const token =
  "AAAAAAAAAAAAAAAAAAAAACbnTwEAAAAAi5lpAu76FoxUyjjoKxXtj0z5EZI%3DuRykufKzVgyuLlfXjsZMEiJCzNp7uKVRksY4keS3zhRM50VVPH";
const link = "https://twitter.com/SkySportsNews/status/1441385906645225472";
const id = link.match("status/([0-9]+)*")[1];
console.log(id);
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
let username;

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

async function getUserFromTweetId() {
  const params = {
    ids:`${id}`,
    "tweet.fields":"author_id",
    "expansions":"author_id",
    "user.fields":"username",
  };
  const res = await getResponse('https://api.twitter.com/2/tweets', params);
  return res.includes.users[0].username;
};

async function getRequest() {
  username = await getUserFromTweetId(id);
  const params = {
    query: `from:${username}`,
    "tweet.fields": "author_id,conversation_id",
    // "max_results":10
  };
  const resp = await getResponse(endpointUrl, params);
  const filteredResp = resp.data.filter(response => {
      return response.conversation_id===id;
  });
  return filteredResp;
}

(async() => {

    try {
        
        const response = await getRequest();
        console.log(response);

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();
