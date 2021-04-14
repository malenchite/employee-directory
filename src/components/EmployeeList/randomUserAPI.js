/* Returns an array of random user data */
async function randomUsers(count) {
  const apiURL = "https://randomuser.me/api/?nat=us&results=" + count;
  const users = await fetch(apiURL)
    .then(response => response.json())
    .then(users => users.results.map(user => {
      return {
        firstName: user.name.first,
        lastName: user.name.last,
        state: user.location.state,
        email: user.email,
        phone: user.phone,
        id: user.login.uuid
      }
    }
    ));

  return users;
}

export default randomUsers;

