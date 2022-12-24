console.log("Before");

getUser(1, (user) => {
  getRepository(user.gitHubUsername, (repos) => {
    console.log(repos);
  });
});

console.log("After");

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
