import React, { useState, useEffect } from "react";
import styles from "@/components/HeroIndex.module.css";
import stylesOrange from "@/components/OrangeButton.module.css";
import Link from "next/link";
import stylesMenu from "./menus.module.css";

const images = [
  "/img/menu/dondecomerenzaragoza.webp",
  "/img/menu/menusenzaragoza.webp",
  "/img/menu/restauranteendelicias.webp",
  "/img/menu/reservadegruposzaragoza.webp",
];
 const MenuPinocho = () => {
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
          <h1 className={styles.title}>Los mejores menús</h1>
          <h2 className={styles.subtitle}>Primero, segundo y postre</h2>
          <Link className={stylesOrange.button} href="/reservas">
            Reservar ahora
          </Link>
        </div>
      </div>
      <div className={stylesMenu.content}>
        <h1 className={stylesMenu.title}>Menús</h1>
        <p className={stylesMenu.textp}>
          En Restaurante Pinocho, nos enorgullecemos de ofrecer auténticos menús
          de cocina tradicional mediterránea, preparados con los ingredientes
          más frescos y de la más alta calidad. Nuestra experiencia culinaria se
          sirve a mesa completa, garantizando que cada plato sea una fiesta para
          los sentidos, compartida en la calidez de la compañía.
        </p>
        <p className={stylesMenu.textp}>
          Entendemos la importancia de atender las necesidades dietéticas
          individuales. Por ello, nuestros menús se adaptan con cuidado a
          alergias e intolerancias alimentarias. Para asegurar una experiencia
          culinaria segura y placentera, rogamos a nuestros comensales indicar
          siempre previamente cualquier alergia o intolerancia. Nuestro
          comprometido equipo de cocina se esforzará en personalizar su
          experiencia gastronómica, sin comprometer el sabor ni la calidad. ¡Ven
          y disfruta de nuestra cocina de 13:00 a 15:30 horas, donde cada plato
          está preparado con amor y dedicación para ofrecerte una experiencia
          gastronómica inolvidable!
        </p>
      </div>
      <div className={stylesMenu.container}>
      <div className={`${stylesMenu.row} ${stylesMenu.reverse}`}>
          <img
            src="/img/menu/especiales.webp"
            alt="Imagen Descriptiva 2"
            className={stylesMenu.image}
          />
          <div className={stylesMenu.text}>
            <p className={stylesMenu.textcol}>
            Descarga nuestros menús especiales, en Restaurante Pinocho queremos celebrar contigo los días más importantes del año, como el Día del Pilar y Nochevieja. ¡Haz tu reserva y disfruta de una experiencia única con nosotros! .{" "}
            </p>
            <Link
              className={stylesOrange.button}
              href="/pdfs/pilares.pdf"
              download="pilares.pdf"
            >
              Descargar menú Día del pilar
            </Link>
            <Link
              className={stylesOrange.button}
              href="/pdfs/navidad.pdf"
              download="navidad.pdf"
            >
              Descargar menú Navidad
            </Link>
            <Link
              className={stylesOrange.button}
              href="/pdfs/nochevieja.pdf"
              download="nochevieja.pdf"
            >
              Descargar menú Noche vieja
            </Link>
          
          </div>
        </div>

        <div className={stylesMenu.row}>
          <img
            src="/img/menu/ternascozaragoza .webp"
            alt="Imagen Descriptiva 1"
            className={stylesMenu.image}
          />
          <div className={stylesMenu.text}>
            <p className={stylesMenu.textcol}>
              Podrás encontrar dos menús y dentro de ellos elegir un primero, un
              segundo y un postre. Apto para mesas de hasta 7 personas.
            </p>
            <Link
              className={stylesOrange.button}
              href="/pdfs/menu20.pdf"
              target="_blank"
              download="MenuPinocho.pdf"
            >
              Descargar menú
            </Link>
          </div>
        </div>
        <div className={`${stylesMenu.row} ${stylesMenu.reverse}`}>
          <img
            src="/img/menu/entrecotvacazaragoza.webp"
            alt="Imagen Descriptiva 2"
            className={stylesMenu.image}
          />
          <div className={stylesMenu.text}>
            <p className={stylesMenu.textcol}>
              En la versión de grupo también disponemos de dos menús, en estos
              los entrates van a compartir y solo se deberá elegir un segundo y
              un postre. Apto para mesas a partir de 8 personas.{" "}
            </p>
            <Link
              className={stylesOrange.button}
              href="/pdfs/menugrupo.pdf"
              download="MenuGrupo.pdf"
            >
              Descargar menús de grupo
            </Link>
          </div>
        </div>

        <div className={stylesMenu.row}>
          <img
            src="/img/menu/menuinfantilzaragoza.webp"
            alt="Imagen Descriptiva 3"
            className={stylesMenu.image}
          />
          <div className={stylesMenu.text}>
            <p className={stylesMenu.textcol}>
              Disponemos de dos menús para los más pequeños. Incluyen bebida y
              postre. Apto para niños de hasta 12 años.{" "}
            </p>
            <Link
              className={stylesOrange.button}
              href="/pdfs/menuinfantil.pdf"
              download="MenuInfantil.pdf"
            >
              Descargar menú infantil
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPinocho ;