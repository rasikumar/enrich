import axios from "axios";

const Instance = axios.create({
  baseURL: "http://192.168.20.7:5000", // Correct usage
  headers: { "Content-Type": "application/json" },
});

Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default Instance;
