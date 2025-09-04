import App from "@/App";
import ErrorBoundary from "@/Components/Error-Boundary";
import type { ReactNode } from "react";
import { adminLinks } from "./adminLinks";
import Layout from "@/layout";

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
            <Layout />
        ),
        children: adminLinks.map((each) => ({
            path: `/admin/${each.path}`,
            element: each.element,
        })),
        errorElement: <ErrorBoundary />,
    },
]