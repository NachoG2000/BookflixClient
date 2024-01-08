import {useState} from 'react'

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

export default function AvatarDropdown() {

    const [isSubscribed, setIsSubscribed] = useState(true);

    const handleSubscriptionChange = () => {
        setIsSubscribed(!isSubscribed);
    };

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
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSubscriptionChange}>
                                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    )
}

