import { PanelRightClose, PanelRightOpen } from "lucide-react";

interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TopNav({ isCollapsed, setIsCollapsed }: TopNavProps) {
    return (
        <>
            <div className="flex gap-6">
                <div className="flex h-full w-full items-center justify-start">
                    <div onClick={() => setIsCollapsed((prev) => !prev)}>
                        {isCollapsed ? (
                            <PanelRightClose
                                size={20}
                                className="cursor-pointer text-black/70 hover:text-black duration-150"
                            />
                        ) : (
                            <PanelRightOpen
                                size={20}
                                className="cursor-pointer text-black/70 hover:text-black duration-150"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
