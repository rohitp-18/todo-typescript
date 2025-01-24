import Axios from "axios";

// create instance of axios
const axios = Axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*", // allow cors
    "Allow-Control-Allow-Methods": "*", // allow cors
  },
});

export default axios;
