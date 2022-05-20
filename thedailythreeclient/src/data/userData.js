import axios from "axios";

const dbURL = "https://localhost:7115/api";

const getSingleUser = (userId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/users/id/${userId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

const updateUser = (userId, userObj) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/users/${userId}`, userObj)
      .then(() => getSingleUser(userId))
      .then(resolve)
      .catch(reject);
  });

const addNewUser = (userObj) =>
  new Promise((resolve, reject) => {
    axios.post(`${dbURL}/users`, userObj).then(resolve).catch(reject);
  });

export { getSingleUser, updateUser, addNewUser };
