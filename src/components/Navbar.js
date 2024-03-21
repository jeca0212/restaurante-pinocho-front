import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css'; 


export const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (

    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/"><img src="/img/logo_pinocho.webp" alt="Logo" className={styles.logo} /></Link>
        </div>
        <div className={styles.menuIcon} onClick={toggleNav}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <nav className={`${styles.navbar} ${isNavVisible ? styles.navActive : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/carta">Carta</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/eventos">Eventos</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/contacto">Contacto</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={`${styles.navLink} ${styles.radius}`} href="/menus">Menús</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.button}href="/reservas">Reservas</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};


