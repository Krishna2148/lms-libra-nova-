import type React from "react"
import { cn } from "@/lib/utils"
import { Menu, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/Components/ui/button"
import { ScrollArea } from "@/Components/ui/scroll-area"
import Nav from "./SideMenuNav"
import { sideMenuData } from "../SideMenuData"
import { Layout } from "./Layout"
import Logo from "@/assets/logo.png"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
}

export default function Sidebar({ className, isCollapsed }: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full transition-[width] md:bottom-0 md:right-auto md:h-svh 
     ${isCollapsed ? "md:w-14" : "md:w-64"} bg-blue-500`, 
        className,
      )}
    >
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? "h-svh opacity-50" : "h-0 opacity-0"
          } w-full bg-slate-900/80 md:hidden`}
      />

      <Layout fixed className={navOpened ? "h-svh" : ""}>
        {/* Header stays white */}
        <Layout.Header
          sticky
          className="bg-white z-50 flex h-[60px] justify-between border-b border-slate-200 px-4 py-3 md:px-4"
        >
          <div className={`flex items-center ${!isCollapsed ? "gap-2" : ""}`}>
            <div
              className={`flex items-center gap-3 justify-end truncate transition-all cursor-pointer ${isCollapsed ? "invisible w-0" : "visible w-auto"
                }`}
              onClick={() => navigate("/admin")}
            >
              <img
                src={Logo || "/placeholder.svg"}
                className="h-13 w-15 object-contain"
                alt="Library Logo"
              />
              <div className="font-sans leading-tight">
                <div className="text-lg font-bold text-indigo-700">LibraNova</div>
                <div className="text-xs text-slate-500 italic">
                  (Library + Innovation, futuristic)
                </div>
              </div>
            </div>
            <>{isCollapsed && <img src={Logo || "/placeholder.svg"} className="h-full w-full scale-150" alt="" />}</>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <Plus className="rotate-45" /> : <Menu />}
          </Button>
        </Layout.Header>

        <ScrollArea>
          <Nav
            id="sidebar-menu"
            className={`z-40 h-full flex-1 ${navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"
              }`}
            closeNav={() => setNavOpened(false)}
            isCollapsed={isCollapsed}
            links={sideMenuData}
          />
        </ScrollArea>
      </Layout>
    </aside>

  )
}
