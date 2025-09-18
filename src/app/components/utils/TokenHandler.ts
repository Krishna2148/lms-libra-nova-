import { decryptData, encryptData } from "../lib/EncryptDecrypt";
import Cookies from "js-cookie";

export const getToken = (key: string) => {
  if (key === "roles") {
    const data = localStorage.getItem(key) || "";
    return data ? decryptData(data) : "";
  }
  const data = Cookies.get(key) || "";
  return data ? decryptData(data) : "";
};

export const setToken = (key: string, value: string) => {
  if (key === "roles") {
    localStorage.setItem(key, encryptData(value));
  } else {
    Cookies.set(key, encryptData(value));
  }
};

export const removeToken = (key: string) => {
  if (key === "roles") {
    localStorage.removeItem(key); 
  } else {
    Cookies.remove(key);
  }
};

export const removeAllTokens = () => {
  Cookies.remove("token");
  Cookies.remove("username");
  localStorage.removeItem("roles"); 
};
