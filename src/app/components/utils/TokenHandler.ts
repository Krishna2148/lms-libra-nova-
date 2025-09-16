import { decryptData, encryptData } from "../lib/EncryptDecrypt";
import Cookies from "js-cookie";

export const getToken = (key: string) => {
    if (key === "permissions") {
        const data = localStorage.getItem(key) || ""; // Fixed: getItem not getToken
        return data ? decryptData(data) : "";
    }
    const data = Cookies.get(key) || "";
    return data ? decryptData(data) : "";
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