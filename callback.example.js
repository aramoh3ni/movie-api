console.log("Before");
getUser(1, getRepository);
console.log("After");

function getRepository(user) {
  getRepository(user.gitHubUsername, getCommits);
}

function displayCommits(commits) {
  getCommits(commits);
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading User from Database...");
      resolve({ id: id, gitHubUsername: "aramoh3ni" });
    }, 1000);
  });
}

function getRepository(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Connection to Github.com...");
      resolve(["rep1", "rep2", "rep3"]);
    }, 1000);
  });
}

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading commit from Github.com...");
      resolve(["commit1", "commit2", "commit3"]);
    }, 1000);
  });
}
