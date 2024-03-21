import Axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import styles from "./form.module.css";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.push('/reservas');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:8000/api/login', formData);
      if (response.data.success) {
        const token = response.data.access_token;
        if (token) {
          localStorage.setItem('access_token', token);
          router.push('/reservas');
        } else {
          console.error('No se recibió ningún token de la API.');
        }
      } else {
        console.error('Inicio de sesión fallido:', response.data.message);
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
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Usuario
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
             name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Contraseña
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
             name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="off"
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
        <button
          type="button"
          className={styles.registerButton}
          onClick={() => router.push("/register")}
        >
          Registrarme
        </button>
      </form>
    </div>
  );
}
