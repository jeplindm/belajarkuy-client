import axios from "axios";

const instance = axios.create({
  baseURL: "https://35.219.81.197",
});

export default instance;
