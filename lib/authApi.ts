import axios from "axios";

// Used for login, register, password reset, etc.
const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export default authApi;
