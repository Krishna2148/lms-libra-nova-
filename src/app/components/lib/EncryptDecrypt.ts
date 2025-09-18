import CryptoJS from "crypto-js";
const SECRET_KEY = "secret-key||KRISHNA||BHATT";

export const encryptData = (data: any): string => {
    try {
        const jsonString = JSON.stringify(data);
        const ciphertext = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
        
        // Convert to Base64 for safe storage/transmission
        const base64Ciphertext = CryptoJS.enc.Base64.stringify(
            CryptoJS.enc.Utf8.parse(ciphertext)
        );
        return base64Ciphertext;
    } catch (error) {
        console.error("Encryption error:", error);
        throw new Error("Failed to encrypt data");
    }
};

export const decryptData = (base64Ciphertext: string): any => {
    try {
        if (!base64Ciphertext) {
            return null;
        }

        // Decode from Base64
        const decodedCiphertext = CryptoJS.enc.Base64.parse(
            base64Ciphertext
        ).toString(CryptoJS.enc.Utf8);

        // Decrypt the AES encrypted data
        const bytes = CryptoJS.AES.decrypt(decodedCiphertext, SECRET_KEY);
        
        // Convert to UTF-8 string
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        
        if (!decryptedString) {
            throw new Error("Decryption failed - empty result");
        }

        // Parse the JSON
        const decryptedData = JSON.parse(decryptedString);
        return decryptedData;
    } catch (error) {
        console.error("Decryption error:", error);
        // Return empty array instead of throwing to prevent app crashes
        return [];
    }
};