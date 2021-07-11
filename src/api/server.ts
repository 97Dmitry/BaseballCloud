import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://baseballcloud-back.herokuapp.com/api/v1/",
});

export default httpClient;
