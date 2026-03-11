import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function registerUser({name, email, password}) {
  try {
    const response = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser({email, password}) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    const response = await api.get("/api/auth/logout");

    return response.data;
  } catch (_err) {
    console.error(_err);
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
