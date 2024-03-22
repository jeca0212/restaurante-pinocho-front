import { useState } from 'react';
import Axios from 'axios';
import styles from './register.module.css'
import { useRouter } from 'next/router';

 export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Hacer una petición a tu API para registrar al usuario
      const response = await fetch('https://jessica.v2.proyectosdwa.es/public/api/register', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // Si el registro es exitoso, redirige al usuario a la página de inicio de sesión
        router.push('/login');
    } else {
      const data = await response.json();
      console.error('No se ha podido hacer el registro:', data.error);
    }
};
    
    return (
<div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
  <div className={styles.formGroup}>
    <label className={styles.label} htmlFor="name">Name</label>
    <input className={styles.input}
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Name"
      required
      autoComplete="off"
    />
  </div>
  <div className={styles.formGroup}>
    <label className={styles.label} htmlFor="email">Email</label>
    <input className={styles.input}
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
    <label className={styles.label} htmlFor="password">Password</label>
    <input className={styles.input}
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Password"
      required
      autoComplete="new-password"
    />
  </div>
  <div className={styles.formGroup}>
    <label className={styles.label} htmlFor="password_confirmation">Confirm Password</label>
    <input className={styles.input}
      type="password"
      id="password_confirmation"
      name="password_confirmation"
      value={formData.password_confirmation}
      onChange={handleChange}
      placeholder="Confirm Password"
      required
      autoComplete="new-password"
    />
  </div>
  <button type="submit" className={styles.loginButton}>Registrarme</button>
</form>
</div>

     );
}

export default Register;
