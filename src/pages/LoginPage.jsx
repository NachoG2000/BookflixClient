import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth } = useAuth();
    const navigate = useNavigate();    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/authenticate', {
                email,
                password
            },);

            // Handle the response here
            // console.log(response);
            setAuth({
                email,
                password,
                jwtToken: response.data.jwtToken,
                refreshToken: response.data.refreshToken,
                role: response.data.role
            });
            navigate('/books');
        } catch (error) {
            // Handle the error here
            console.error(error);
        }
    };


    return (
        <div>
            <header className="p-6 flex justify-between items-center hover:bg-gray-50">
                <img src='./bookflix.svg' alt="Bookflix" className="h-12" />
            </header>
            <div className="max-w-sm mx-auto my-10 p-6 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold mb-2">Log in</h2>
                <p className="mb-4">Provide your login details to access your account</p>
                <div className="flex justify-between mb-4">
                    <Button className="flex-1 mr-2" variant="outline">
                        <GithubIcon className="w-5 h-5 mr-2" />
                        Github{"\n          "}
                    </Button>
                    <Button className="flex-1 ml-2" variant="outline">
                        <ChromeIcon className="w-5 h-5 mr-2" />
                        Google{"\n          "}
                    </Button>
                </div>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="flex-shrink mx-4 text-gray-400 text-xs">OR CONTINUE WITH</span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <Button className="w-full" type="submit">Log in</Button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Dont have an account?
                        <Link to="/register" className="text-blue-600 no-underline cursor-pointer" href="#">
                            {"\n          "}Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage; 

function ChromeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="21.17" x2="12" y1="8" y2="8" />
            <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
            <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
        </svg>
    )
}


function GithubIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    )
}