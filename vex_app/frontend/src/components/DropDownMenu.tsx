// react hooks
import { useSession } from "@/hooks/useSession";
import { useLogout } from "./Logout";

// components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";


export const DropDownMenu = () => {
  const Logout = useLogout();
  const user = useSession();
 
 return (
  <DropdownMenu>
  {/* icon */}
  <DropdownMenuTrigger asChild>
    <Button
    variant="outline"
    size="icon" 
    className="rounded-full"
    >
      <img
        src="/user_icon.png"
        width="40" 
        height="40"
        alt="Avatar"
        className="overflow-hidden rounded-full"
      />
    </Button>
  </DropdownMenuTrigger>

  {/* dropdown */}
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>{user ? user.email : "My Account"}</DropdownMenuLabel>

    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem className="cursor-pointer" disabled>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" disabled>
        Settings
      </DropdownMenuItem>
    </DropdownMenuGroup>

    <DropdownMenuSeparator />
    <DropdownMenuItem className="cursor-pointer" onSelect={Logout}>
      Log out
    </DropdownMenuItem>
  </DropdownMenuContent>
  </DropdownMenu>
 )
}
