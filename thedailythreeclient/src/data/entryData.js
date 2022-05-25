import axios from "axios";

const dbURL = "https://localhost:7074/api";

const getAllUserEntries = (userId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/entries/user/${userId}`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const getAllUserEntriesByUid = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/entries/user/uid/${uid}`)
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

const deleteEntry = (entryId, uid) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbURL}/entries/${entryId}`)
      .then(() => getAllUserEntries(uid).then(resolve))
      .catch(reject);
  });

const addNewEntry = (entryObj) =>
  new Promise((resolve, reject) => {
    axios.post(`${dbURL}/entries`, entryObj).then(resolve).catch(reject);
  });

const getMostRecentEntryByUid = (uid) =>
  new Promise((resolve, reject) => {
    getAllUserEntriesByUid(uid)
      .then((allEntries) => {
        const newestEntry = allEntries.reduce((a, b) =>
          a.dateCreated < b.dateCreated ? a : b
        );
        resolve(newestEntry);
      })
      .catch(reject);
  });

export {
  getAllUserEntries,
  getSingleEntry,
  deleteEntry,
  addNewEntry,
  getAllUserEntriesByUid,
  getMostRecentEntryByUid,
};
