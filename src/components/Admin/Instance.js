import axios from "axios";

const Instance = axios.create({
  baseURL: "https://newcheck.evvisolutions.com", // Correct usage
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
