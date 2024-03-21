import React, { useState, useEffect } from 'react';
import styles from '@/components/HeroIndex.module.css'
import stylesOrange from "@/components/OrangeButton.module.css";
import Link from 'next/link';

const images = [
    '/img/hero/restaurantezaragoza.webp',
    '/img/hero/comerenzaragoza.webp',
    '/img/hero/restaurantepinocho.webp',
    '/img/hero/pinochozaragoza.webp',
    
  ];
  
  export const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % images.length);
      }, 5000); 
  
      return () => clearInterval(timer);
    }, [currentIndex]);
  
    return (
      <div className={styles.hero} style={{ backgroundImage: `url(${images[currentIndex]})` }}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Restaurante</h1>
          <h2 className={styles.subtitle}>La mejor comida mediterránea tradicional</h2>
          <Link className={stylesOrange.button} href="/reservas">Reservar ahora</Link>
        </div>
      </div>
    );
  };