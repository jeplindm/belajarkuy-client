import axios from "axios";

const instance = axios.create({
  baseURL: "https://byuk.my.id",
});

export default instance;
