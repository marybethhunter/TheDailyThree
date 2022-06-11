import axios from "axios";

const dbURL = "https://localhost:7074/api";

const getAllUserGoals = (userId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/goals/${userId}`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const getAllUserGoalsByUid = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/goals/user/uid/${uid}`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const getSingleGoal = (goalId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/goals/id/${goalId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

const deleteGoal = (goalId, uid) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbURL}/goals/${goalId}`)
      .then(() => getAllUserGoalsByUid(uid).then(resolve))
      .catch(reject);
  });

const addNewGoal = (goalObj) =>
  new Promise((resolve, reject) => {
    axios.post(`${dbURL}/goals`, goalObj).then(resolve).catch(reject);
  });

const updateGoal = (goalId, goalObj, uid) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${dbURL}/goals/${goalId}`, goalObj)
      .then(() => getAllUserGoalsByUid(uid).then(resolve))
      .catch(reject);
  });

export {
  updateGoal,
  deleteGoal,
  addNewGoal,
  getSingleGoal,
  getAllUserGoals,
  getAllUserGoalsByUid,
};
