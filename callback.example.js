// Asynchronous Structure
// Problem CALLBACK HELL or crismase tree 😆 or nesting calling function.
console.log("Before");
getUser(1, (user) => {
  getRepository(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
        console.log(commits);
    })
  });
});
console.log("After");

// Synchronous Strucutre
const user = getUser(1);
const repos = getRepository(user.gitHubUsername);
const commits = getCommits(repos[0]);



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
  