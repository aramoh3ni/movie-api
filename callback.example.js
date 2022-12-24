console.log("Before");
getUser(1, getRepository);
console.log("After");

// Flat Structure and chain them 
getUser(1)
  .then((user) => getRepository(user.gitHubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log(commits))
  .catch((err) => console.log(err.message));


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
      console.log("Reading commits from Github.com...");
      resolve(["commit1", "commit2", "commit3"]);
    }, 1000);
  });
}
