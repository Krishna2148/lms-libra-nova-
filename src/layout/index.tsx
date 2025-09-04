import useIsCollapsed from "@/hooks/UseIsCollapsed";
import TopBar from "./Header";
import Sidebar from "./SideMenu";
import { Layout } from "./SideMenu/Layout";
import { Outlet } from "react-router-dom";

const SideMenu = () => {
    const [isCollapsed, setIsCollapsed] = useIsCollapsed();
    return (
        <>
            <div
                className={`flex h-[60px] w-full justify-center ${isCollapsed ? "md:pl-14" : "md:pl-64"
                    }`}
            >
                <TopBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            </div>
            <div className="relative h-full overflow-hidden bg-background">
                <Sidebar isCollapsed={isCollapsed} />

                <Layout fixed>
                    <Layout.Body
                        id="content"
                        className={`overflow-y-auto  p-2 px-4 transition-[margin] ${isCollapsed
                                ? "md:ml-14 md:w-[calc(100%-3.5rem)]"
                                : "md:ml-64 md:w-[calc(100%-16rem)]"
                            }`}
                    >
                        <Outlet />
                    </Layout.Body>
                </Layout>
            </div>

        </>
    )
}

export default SideMenu