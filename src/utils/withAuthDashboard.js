import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function withAuthDashboard(Component) {
    return function ProtectedRoute({...props}) {
        const [token, setToken] = useState(null);
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('access_token');
            setToken(token);
            if (!token) {
                router.replace('/loginAdmin'); 
            }
        }, [router]);

        return token ? <Component {...props} /> : null;
    }
}
