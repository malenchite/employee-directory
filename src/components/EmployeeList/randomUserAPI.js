/* Returns an array of random user data */
async function randomUsers(count) {
  const apiURL = "https://randomuser.me/api/?nat=us&results=" + count;
  const users = await fetch(apiURL)
    .then(response => response.json())
    .then(users => users.results);

  return users;
}

export default randomUsers;

