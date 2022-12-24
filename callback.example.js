console.log("Before");
getUser(1, getRepository);
console.log("After");

function getRepository(user) {
  getRepository(user.gitHubUsername, getCommits);
}

function displayCommits(commits) {
  getCommits(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading User from Database...");
    callback({ id: id, gitHubUsername: "aramoh3ni" });
  }, 1000);
}

function getRepository(username, callback) {
  setTimeout(() => {
    console.log("Connection to Github.com...");
    callback(["rep1", "rep2", "rep3"]);
  }, 1000);
}

function getCommits(repos, callback) {
  setTimeout(() => {
    console.log("Reading commit from Github.com...");
    callback(["commit1", "commit2", "commit3"]);
  }, 1000);
}
