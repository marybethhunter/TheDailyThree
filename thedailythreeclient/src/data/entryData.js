import axios from "axios";

const dbURL = "https://localhost:7115/api";

const getAllUserEntries = (userId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/entries/user/${userId}`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const getSingleEntry = (entryId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/entries/id/${entryId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

const deleteEntry = (entryId, userId) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbURL}/entries/${entryId}`)
      .then(() => getAllUserEntries(userId).then(resolve))
      .catch(reject);
  });

const addNewEntry = (entryObj) =>
  new Promise((resolve, reject) => {
    axios.post(`${dbURL}/entries`, entryObj).then(resolve).catch(reject);
  });

export { getAllUserEntries, getSingleEntry, deleteEntry, addNewEntry };
