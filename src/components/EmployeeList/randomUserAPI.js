/* Returns an array of random user data */
async function randomUsers(count) {
  const apiURL = "https://randomuser.me/api/?results=" + count;
  const users = await fetch(apiURL).then(response => response.json());

  return users;
}

export default randomUsers;
