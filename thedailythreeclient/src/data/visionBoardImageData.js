import axios from "axios";
import { getAllUserVisionBoardsByUid } from "./visionBoardData";

const dbURL = "https://localhost:7074/api";

const getAllVisionBoardImagesByVBId = (vbId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/visionboardimages/${vbId}`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const getSingleVisionBoardImage = (visionBoardImageId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/visionboardimages/id/${visionBoardImageId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

const deleteVisionBoardImage = (visionBoardImageId, uid) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${dbURL}/visionboardimages/${visionBoardImageId}`)
      .then(() => getAllUserVisionBoardsByUid(uid).then(resolve))
      .catch(reject);
  });

const addNewVisionBoardImage = (visionBoardImageObj) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${dbURL}/visionboardimages`, visionBoardImageObj)
      .then(resolve)
      .catch(reject);
  });

const updateVisionBoardImage = (visionBoardImageId, visionBoardImageObj, uid) =>
  new Promise((resolve, reject) => {
    axios
      .put(
        `${dbURL}/visionboardimages/${visionBoardImageId}`,
        visionBoardImageObj
      )
      .then(() => getAllUserVisionBoardsByUid(uid).then(resolve))
      .catch(reject);
  });

export {
  updateVisionBoardImage,
  deleteVisionBoardImage,
  addNewVisionBoardImage,
  getSingleVisionBoardImage,
  getAllVisionBoardImagesByVBId,
};
