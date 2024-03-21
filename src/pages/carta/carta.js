import React, { useState, useEffect } from "react";
import styles from "@/components/HeroIndex.module.css";
import stylesOrange from "@/components/OrangeButton.module.css";
import Link from "next/link";
import stylesCarta from "./carta.module.css";

const images = [
  "/img/carta/papabravasenzaragoza).webp",
  "/img/carta/tapaspinocho.webp",
  "/img/carta/tapearenzaragoza.webp",
  "/img/carta/tartadequesoenzaragoza.webp",
];

export const CartaPinocho = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Para compartir</h1>
          <h2 className={styles.subtitle}>
            Disfruta de nuestra carta con los tuyos
          </h2>
          <Link className={stylesOrange.button} href="/reservas">
            Reservar ahora
          </Link>
        </div>
      </div>
      <div className={stylesCarta.content}>
        <h1 className={stylesCarta.title}>Carta</h1>
        <p className={stylesCarta.textp}>
          Nuestra carta te invita a descubrir una exquisita selección de tapas y
          raciones que capturan la esencia de los sabores más genuinos. Con
          capacidad para mesas de hasta 7 personas, te brindamos un ambiente
          acogedor donde compartir momentos memorables alrededor de la mesa.
          Además, en Pinocho nos preocupamos por tu bienestar y nos adaptamos a
          tus necesidades alimentarias. Si tienes alergias o intolerancias, solo
          tienes que informar a nuestro camarero para que podamos ofrecerte un
          servicio aún más personalizado.
        </p>
        <p className={stylesCarta.textp}>
          ¡Ven y disfruta de nuestra cocina de 13:00 a 15:30 horas, donde cada
          plato está preparado con amor y dedicación para ofrecerte una
          experiencia gastronómica inolvidable!
        </p>
      </div>
      <div className={stylesCarta.container}>
        <div className={stylesCarta.row}>
          <img
            src="/img/carta/alitas.webp"
            alt="Imagen Descriptiva 1"
            className={stylesCarta.image}
          />
          <div className={stylesCarta.text}>
            <p className={stylesCarta.textcol}>
              Disfruta de nuestras deliciosas raciones, cuidadosamente
              elaboradas para satisfacer tu paladar exigente. Ofrecemos una
              variedad de opciones en nuestros menús para que puedas crear tu
              combinación perfecta
            </p>
            <Link
              className={stylesOrange.button}
              href="/pdfs/raciones.pdf"
              download="RacionesPinocho.pdf"
            >
              Descargar raciones
            </Link>
          </div>
        </div>
        <div className={`${stylesCarta.row} ${stylesCarta.reverse}`}>
          <img
            src="/img/carta/torrezno.webp"
            alt="Imagen Descriptiva 2"
            className={stylesCarta.image}
          />
          <div className={stylesCarta.text}>
            <p className={stylesCarta.textcol}>
              ¡Convierte tu visita en una fiesta para tus sentidos al elegir
              entre nuestra amplia selección de tapas y maridarlas con tus
              bebidas favoritas! Sumérgete en una experiencia gastronómica
              incomparable.{" "}
            </p>
            <Link
              className={stylesOrange.button}
              href="/pdfs/tapas.pdf"
              download="TapasPinocho.pdf"
            >
              Descargar tapas
            </Link>
          </div>
        </div>

        <div className={stylesCarta.row}>
          <img
            src="/img/carta/ganache.webp"
            alt="Imagen Descriptiva 3"
            className={stylesCarta.image}
          />
          <div className={stylesCarta.text}>
            <p className={stylesCarta.textcol}>
              Endulza tu día en Pinocho con nuestros irresistibles postres.
              Desde clásicos reconfortantes hasta creaciones innovadoras,
              nuestros postres están cuidadosamente elaborados para satisfacer
              tus antojos más dulces.{" "}
            </p>
            <Link
              className={stylesOrange.button}
              href="/pdfs/postres.pdf"
              download="PostresPinocho.pdf"
            >
              Descargar postres
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
