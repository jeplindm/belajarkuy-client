import axios from "axios";

const instance = axios.create({
  baseURL: "http://35.219.81.197:8082",
});

export default instance;
