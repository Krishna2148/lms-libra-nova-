import BorrowBooks from "@/pages/Borrow-Books";
import Dashboard from "../pages/Dashboard";
import BookManagement from "@/pages/Book-Mgmt";
import Reservation from "@/pages/Reservation";
import Membership from "@/pages/Membership";
import Reports from "@/pages/Reports";
import UserManagement from "@/pages/User-Mgmt/Users";
import RoleManagement from "@/pages/User-Mgmt/Roles";

export const adminLinks = [
    {
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        path: "book-mgmt",
        element: <BookManagement />,
    },
    {
        path: "borrow-books",
        element: <BorrowBooks />,
    },
    {
        path: "reservation",
        element: <Reservation />
    },
    {
        path: "membership",
        element: <Membership />
    },
    {
        path: "reports",
        element: <Reports />
    },
    // user management
    {
        path: "user-mgmt/users",
        element: <UserManagement />
    },
    {
        path: "user-mgmt/roles",
        element: <RoleManagement />
    }
]