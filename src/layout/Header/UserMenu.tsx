import { removeAllTokens } from "@/app/components/utils/TokenHandler";
import Toast from "@/components/Toastify";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserMenu() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeAllTokens();
        Toast("Logout successful", "success");
        navigate("/");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                        <p className="text-sm font-medium leading-none">
                            {"User"}
                        </p>

                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-500 hover:bg-red-500/20"
                    onClick={handleLogout}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
