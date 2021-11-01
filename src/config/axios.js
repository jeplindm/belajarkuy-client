import axios from "axios";

const instance = axios.create({
  baseURL: "https://6724cf14-2451-483e-9037-598799eb7dc8.mock.pstmn.io",
});

export default instance;
