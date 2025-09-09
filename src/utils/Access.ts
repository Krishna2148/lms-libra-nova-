// utils/Access.ts
import { getToken } from "./tokenHandler"

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

// Export as default object or individual functions
export default { hasPermission };