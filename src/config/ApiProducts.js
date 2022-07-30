import axios from "axios";

const Instance = axios.create({
  headers: { Accept: "application/json, text/plain, */*" },
  baseURL: "https://api.escuelajs.co/api/v1/",
});

export default Instance;
