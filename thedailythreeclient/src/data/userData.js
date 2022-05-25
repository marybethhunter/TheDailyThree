import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from "./apiKeys";

const dbURL = "https://localhost:7074/api";

const getSingleUser = (userId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/users/id/${userId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

  const getUserByUid = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/users/${uid}`)
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
 
const checkUserCreatedInDB = async () => {
    const token= sessionStorage.getItem("token");
    await axios.get(`${dbURL}/users/Auth`, {
        headers: { Authorization: 'Bearer ' + token },
    });
};

const signInUser = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const signOutUser = () =>
  new Promise((resolve, reject) => {
    getAuth().signOut().then(resolve).catch(reject);
  });

export {
  getSingleUser,
  updateUser,
  addNewUser,
  checkUserCreatedInDB,
  signInUser,
  signOutUser,
  getUserByUid,
};
