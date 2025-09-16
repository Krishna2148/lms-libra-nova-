import { getToken } from "./TokenHandler"

export const hasPermission = (permission: string): boolean => {
    const userPermissions = getToken("permissions") || "";
    try {
        const permissionsArray = userPermissions ? JSON.parse(userPermissions) : [];
        return permissionsArray.includes(permission);
    } catch (error) {
        console.error("Error parsing permissions:", error);
        return false;
    }
}

export default { hasPermission };