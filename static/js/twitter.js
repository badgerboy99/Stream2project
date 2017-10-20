twttr.widgets.createTimeline(
  {
    sourceType: "profile",
    screenName: "twitterdev"
  },
  document.getElementById("container"),
  {
    height: 400,
    chrome: "nofooter",
    linkColor: "#820bbb",
    borderColor: "#a80000"
    tweetlimit: 2
  }
);