import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('http://localhost:8080/auth/refresh', {}, {
            headers: {
                'Authorization': `Bearer ${auth.refreshToken}`
            }
        });
    
        setAuth(prev => {
            // console.log("Prev: " + JSON.stringify(prev.jwtToken));
            // console.log("Response: " + response.data.jwtToken);
            return {
                ...prev,
                jwtToken: response.data.jwtToken
            }
        });
        return response.data.jwtToken;
    }
    return refresh;
};

export default useRefreshToken;
