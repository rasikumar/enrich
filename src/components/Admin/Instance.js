import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:5001", // Correct usage
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
