import axios from "axios";

const dbURL = "https://localhost:7115/api";

const getAllMoods = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/moods`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

const getSingleMood = (moodId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/moods/id/${moodId}`)
      .then((response) => resolve(response.data))
      .catch(reject);
  });

const getAllUsersMoods = (userId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${dbURL}/moods/user/${userId}`)
      .then((response) => resolve(Object.values(response.data)))
      .catch(reject);
  });

export { getAllMoods, getSingleMood, getAllUsersMoods };
