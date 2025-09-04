import { useEffect, useState } from "react";
import { Bell, Maximize, Minimize } from "lucide-react";
import { TopNav } from "./TopNav";
import { UserMenu } from "./UserMenu";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [greeting, setGreeting] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Fullscreen toggle handler
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then(() => {
                    setIsFullscreen(false);
                });
            }
        }
    };

    // Update time and greeting every minute
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            // Set greeting based on time of day
            const hours = now.getHours();
            if (hours < 12) {
                setGreeting("Good morning");
            } else if (hours < 18) {
                setGreeting("Good afternoon");
            } else {
                setGreeting("Good evening");
            }
        }, 60000);

        // Initial set
        const hours = currentTime.getHours();
        if (hours < 12) {
            setGreeting("Good morning");
        } else if (hours < 18) {
            setGreeting("Good afternoon");
        } else {
            setGreeting("Good evening");
        }

        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    const formattedDate = currentTime.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="flex h-full w-full items-center justify-between border-b border-slate-300 px-3">
            <TopNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            {/* Greeting and time - shown on desktop */}
            <div className="hidden md:flex ml-5 pr-5 md:flex-1">
                <div className="">
                    <h1 className="text-xs font-bold">{greeting}</h1>
                    <p className="text-xs text-muted-foreground">
                        {formattedTime} • {formattedDate}
                    </p>
                </div>
            </div>

            <div className="ml-auto flex items-center space-x-2">
                <div className="flex gap-1">
                    <button
                        className="h-9 w-9 rounded-full"
                        onClick={toggleFullscreen}
                    >
                        {isFullscreen ? (
                            <Minimize className="h-[1.1rem] w-[1.1rem]" />
                        ) : (
                            <Maximize className="h-[1.1rem] w-[1.1rem]" />
                        )}
                    </button>
                    <div className="md:hidden">
                        <p className="text-sm">{formattedTime}</p>
                    </div>

                    <div className="mr-4 flex gap-1">
                        <button
                            className="scale-95 rounded-full"
                        >
                            <Bell className="size-[1.2rem] rotate-0 scale-100 transition-all" />
                        </button>
                    </div>
                </div>
                <UserMenu />
            </div>
        </div>
    );
};

export default Header;
