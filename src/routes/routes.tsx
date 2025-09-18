import App from "@/App";
import ErrorBoundary from "@/components/Error-Boundary";
import type { ReactNode } from "react";
import { adminLinks } from "./adminLinks";
import Layout from "@/layout";
import ProtectedRoute from "@/app/components/lib/ProtectedRoute";

interface adminLinksType {
    path: string;
    element: ReactNode
}
interface RouteItem {
    path: string;
    element: ReactNode;
    errorElement?: React.ReactNode;
    children?: adminLinksType[];
}

export const Routes: RouteItem[] = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorBoundary />,
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: adminLinks.map((each) => ({
            path: `/admin/${each.path}`,
            element: each.element,
        })),
        errorElement: <ErrorBoundary />,
    },
]