var axios = require("axios");
var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
  return axios
    .get("https://api.github.com/users/" + username)
    .then(response => {
      return response.data;
    });
}
function getRepos(username) {
  return axios.get("https://api.github.com/users/" + username + "/repos");
}
function getStarCount(repos) {
  return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}
function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return followers * 3 + totalStars;
}

function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)]).then(response => {
    var profile = response[0];
    var repos = response[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    };
  });
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}
module.exports = {
  battle: players => {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(err => console.log(err));
  },
  fetchPopularRepos: language => {
    var encodedURI = window.encodeURI(
      "https://api.github.com/search/repositories?q=stars:>1+language:" +
        language +
        "&sort=stars&order=desc&type=Repositories"
    );

    return axios
      .get(encodedURI)
      .then(response => {
        return response.data.items;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
