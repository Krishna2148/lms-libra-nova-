import CryptoJS from "crypto-js";
const SECRET_KEY = "secret-key||KRISHNA||BHATT";

export const encryptData = (data: any): string => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

    const base64Ciphertext = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(ciphertext)
    );
    return base64Ciphertext;
};
export const decryptData = (base64Ciphertext: string): string => {
    const decodedCiphertext = CryptoJS.enc.Base64.parse(
        base64Ciphertext
    ).toString(CryptoJS.enc.Utf8);
    const bytes = CryptoJS.AES.decrypt(decodedCiphertext, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8) || `[]`);
    return decryptedData || "";
};