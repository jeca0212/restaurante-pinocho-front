import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; 
import styles from "./LoginDashboard.module.css";

const LoginDashboard = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.restaurantepinochozaragoza.es/api/login-dashboard', {
                username,
                password
            });
            //console.log('Respuesta del servidor:', response);
            //console.log('Datos de la respuesta del servidor:', response.data);
            if (response.data.token) {
                localStorage.setItem('access_token', response.data.token);
                router.push('/homeDashboard');
            } else {
                console.error('No se recibió ningún token de la API.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Hubo un error durante el inicio de sesión:', error.response.data);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                console.error('Ocurrió un error al hacer la solicitud:', error.message);
            }
        }
    };


    return (
        <div className={styles.container}> 
        <div>
        <h1 className={styles.title}>Iniciar sesión</h1>  
        </div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button className={styles.loginButton} type="submit">Entrar</button>
        </form>
        </div>
    );
}

export default LoginDashboard;