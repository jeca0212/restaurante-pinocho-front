import Link from 'next/link';
import { useState } from 'react';
import styles from './NavbarDashboard.module.css'; 


export const NavbarDashboard = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/homeDashboard"><img src="/img/logo_pinocho.webp" alt="Logo" className={styles.logo} /></Link>
        </div>
        <div className={styles.menuIcon} onClick={toggleNav}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <nav className={`${styles.navbar} ${isNavVisible ? styles.navActive : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/gestionReservas">Gestion de reservas</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/ofertas">Ofertas</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/menusycarta">Gestion de carta</Link>
            </li>
            
          </ul>
        </nav>
      </header>
    </div>
  );
};

