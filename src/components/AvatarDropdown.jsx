import {useState} from 'react'
import useAuth from '../hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

const AvatarDropdown = () => {

    const [isSubscribed, setIsSubscribed] = useState(true);
    const { auth, setAuth } = useAuth();

    const handleSubscriptionChange = () => {
        setIsSubscribed(!isSubscribed);
    };

    const handleLogOut = () => {
        setAuth({});
    }

    return (
        <DropdownMenu>
                <DropdownMenuTrigger>
                        <Avatar size="md" className="cursor-pointer">
                                <AvatarFallback className="bg-gray-200">
                                        {/* <AvatarImage src={icon} /> */}
                                </AvatarFallback>
                        </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                        <DropdownMenuLabel>{auth.email ? auth.email : "My account"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSubscriptionChange}>
                                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AvatarDropdown;