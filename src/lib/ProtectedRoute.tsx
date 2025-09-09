import { type ReactNode } from "react";
import { getToken, removeAllTokens } from "../utils/tokenHandler";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

    const username = getToken("username");
    if (username.length > 0) {
        return <>{children}</>;
    } else {
        removeAllTokens();
        window.location.href = "/";
    }
};

export default ProtectedRoute;