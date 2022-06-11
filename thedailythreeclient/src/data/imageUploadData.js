import axios from "axios";

const baseUrl = process.env.REACT_APP_CLOUDINARY_URL;
const preset = process.env.REACT_APP_CLOUDINARY_PRESET;

const uploadFile = (file) =>
  new Promise((resolve, reject) => {
    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("upload_preset", preset);

    axios
      .post(`${baseUrl}`, fileData)
      .then((response) => resolve(response.data.url))
      .catch(reject);
  });

export default uploadFile;
