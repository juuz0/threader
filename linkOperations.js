import needle from "needle";

const token = process.env.TOKEN;
console.log(token);
async function getTweets(link) {
  const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

  try {
    const id = link.match("status/([0-9]+)*")[1];
    const response = await getRequest(id, endpointUrl);
    return response;
  } catch (e) {
    console.log(e);
  }
}
async function getResponse(endpointUrl, params) {
  const res = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });
  if (res) {
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
    return res.includes.users[0];
  } else {
    throw new Error("Bad link");
  }
}

async function getPfp(username) {
  const endPt = `https://api.twitter.com/2/users/by?usernames=${username}&user.fields=profile_image_url`;
  const res = await needle("get", endPt, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });
  return res.body.data[0].profile_image_url.slice(0, -10) + "bigger.jpg";
}

async function getImages(id) {
  let images = [];
  const params = {
    ids: id,
    expansions: "attachments.media_keys",
    "media.fields": "url",
  };
  const endPoint = "https://api.twitter.com/2/tweets";
  const resp = await getResponse(endPoint, params);
  if (resp.includes) {
    for (const mediaObj of resp.includes.media) {
      if (mediaObj.url != undefined) images.push(mediaObj.url);
    }
  }
  return images;
}

async function getRequest(id, endpointUrl) {
  let images = [];
  const user = await getUserFromTweetId(id);
  const username = user.username;
  const pfpUrl = await getPfp(username);
  const userid = user.id;
  const params = {
    query: `from:${username} conversation_id:${id}`,
    "tweet.fields": "author_id,conversation_id,in_reply_to_user_id,attachments",
    "media.fields": "url,height,preview_image_url",
    expansions: "attachments.media_keys",
    max_results: 100,
  };
  const mParams = {
    ids: `${id}`,
    "tweet.fields": "author_id,conversation_id,in_reply_to_user_id,attachments",
    "media.fields": "url,height,preview_image_url",
    expansions: "attachments.media_keys",
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
  filteredResp = await Promise.all(
    filteredResp.map(async (element) => {
      element["images"] = await getImages(element.id);
      return Promise.resolve(element);
    })
  );
  return {
    username,
    pfpUrl,
    filteredResp,
  };
}

export default getTweets;
