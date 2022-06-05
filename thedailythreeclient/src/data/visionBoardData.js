import axios from "axios";

const dbURL = "https://localhost:7074/api";

const getAllUserVisionBoards = (userId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/visionboards/${userId}`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const getAllUserVisionBoardsByUid = (uid) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/visionboards/user/uid/${uid}`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const getSingleVisionBoard = (visionBoardId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/visionboards/id/${visionBoardId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

const deleteVisionBoard = (visionBoardId, uid) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbURL}/visionboards/${visionBoardId}`)
      .then(() => getAllUserVisionBoardsByUid(uid).then(resolve))
      .catch(reject);
  });

const addNewVisionBoard = (visionBoardObj) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${dbURL}/visionboards`, visionBoardObj)
      .then(resolve)
      .catch(reject);
  });

const updateVisionBoard = (visionBoardId, visionBoardObj, uid) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${dbURL}/visionboards/${visionBoardId}`, visionBoardObj)
      .then(() => getAllUserVisionBoardsByUid(uid).then(resolve))
      .catch(reject);
  });

export {
  updateVisionBoard,
  addNewVisionBoard,
  deleteVisionBoard,
  getSingleVisionBoard,
  getAllUserVisionBoards,
  getAllUserVisionBoardsByUid,
};
