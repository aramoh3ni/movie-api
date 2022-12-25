// Call-Back Approch
console.log("Before");
getUser(1, (user) => {
  getRepository(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});
console.log("After");

// Promise-based Approach
// Flat Structure and chain them
getUser(1)
  .then((user) => getRepository(user.gitHubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log(commits))
  .catch((err) => console.log(err.message));

// Async and Await Approch
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepository(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log(err.message);
  }
}

displayCommits();

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
      // resolve(["commit1", "commit2", "commit3"]);
      reject(new Error("Can't get Commits..."));
    }, 1000);
  });
}
