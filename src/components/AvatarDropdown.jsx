import {useState, useEffect} from 'react'
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
import { axiosPrivate } from '../api/axios'
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

const AvatarDropdown = () => {

    const { auth, setAuth } = useAuth();
    const [isSubscribed, setIsSubscribed] = useState(auth.role === 'ADMIN');

    const handleSubscriptionChange = async () => {
        try {
            // Make an HTTP request to your backend to update the user's role
            const response = await axiosPrivate.put('http://localhost:8080/user/role');
    
            // Toggle the subscription state and update the auth context with the new role
            setIsSubscribed(response.data.role == 'ADMIN' ? true : false);

            // console.log("response " + JSON.stringify(response.data));
            
            setAuth(prevAuth => ({
                ...prevAuth,
                role: response.data.role
            }));

        } catch (error) {
            console.error('Failed to update role:', error);
        }
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