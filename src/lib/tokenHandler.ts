import { decryptData, encryptData } from "./Encryption";
import Cookies from "js-cookie";

export const getToken = (key: string) => {
    if (key === "permissions") {
        return decryptData(localStorage.getToken(key) || "");
    }
    return decryptData(Cookies.get(key) || "");
}

export const setToken = (key: string, value: string) => {
    if (key === "permissions") {
        localStorage.setItem(key, encryptData(value));
    } else {
        Cookies.set(key, encryptData(value));
    }
}

export const removeToken = (key: string) => {
    Cookies.remove(key);
}

export const removeAllTokens = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    Cookies.remove("role");
    localStorage.removeItem("permissions");
}