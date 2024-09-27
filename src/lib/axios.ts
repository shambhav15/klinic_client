import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api", // adjust this to your API's base URL
  withCredentials: true,
  timeout: 15000, // optional: sets a timeout for requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Optional: Add request interceptor
instance.interceptors.request.use(
  (config) => {
    // You can modify the request config here (e.g., add auth tokens)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor
instance.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    // Handle errors globally (e.g., redirect to login if unauthorized)
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);

export default instance;
