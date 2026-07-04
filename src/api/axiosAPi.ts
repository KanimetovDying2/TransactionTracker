import axios from "axios";

const axiosApi = axios.create({
  baseURL:
    "https://js-31-kanimetov-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosApi;
