import axios from "axios";

const axiosInstance = axios.create({
  // local
  // baseURL: "http://127.0.0.1:5000/my-clone-582f3/us-central1/api",
  // api deployed
  baseURL: "https://amazon-api-deplloy.onrender.com/",
});
export default axiosInstance;