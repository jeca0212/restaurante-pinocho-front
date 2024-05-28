import { useState, useEffect } from 'react';
import styles from "./ofertas.module.css";
import axios from 'axios';

const Oferts = () => {
  const [parrafos, setParrafos] = useState([]);
  const [imagen, setImagen] = useState(null);

   
  useEffect(() => {
    fetch('https://api.restaurantepinochozaragoza.es/api/parrafos')
      .then(response => response.json())
      .then(data => {
        setParrafos(data);
  
        // Asume que el primer párrafo tiene una propiedad 'id'
        
      });
  }, []);
  useEffect(() => {
    const obtenerImagen = async () => {
      try {
        const res = await axios.get('https://api.restaurantepinochozaragoza.es/api/get-image');
        console.log(res.data); // Imprime toda la respuesta
        if (res.data && res.data.url) {
          setImagen(res.data.url);
        } else {
          console.log('res.data o res.data.image no está definido');
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    obtenerImagen();
  }, []);

  return (
    <>
    <div className={styles.container}>
  
      <h1 className={styles.title}>Ofertas</h1>
        <p className={styles.textp}>
          En Restaurante Pinocho, nos enorgullecemos de ofrecer auténticos menús
          de cocina tradicional mediterránea, preparados con los ingredientes
          más frescos y de la más alta calidad. Nuestra experiencia culinaria se
          sirve a mesa completa, garantizando que cada plato sea una fiesta para
          los sentidos, compartida en la calidez de la compañía.
        </p>
        <p className={styles.textp}>
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
      <div className={styles.content}>
        <div className={styles.row}>
          <img
             src="/img/ofertas/desayunar-zaragoza.webp"
            alt="Imagen Descriptiva 1"
            className={styles.image}
          />
          <div className={styles.text}>
            <h2  className={styles.h2}>Desayunos</h2>
            <p className={styles.textcol}>
            ¡Ven a desayunar en Restaurante Pinocho! Nuestra deliciosa selección de bizcochos recién horneados, tostadas crujientes, minis tentadores y croissants irresistibles harán que su mañana sea simplemente deliciosa. Y qué mejor manera de acompañar estos manjares que con una buena taza de café, un zumo de naranja exprimido al momento o una deliciosa infusión. Ya sea que estén buscando un desayuno rápido entre semana o quieran disfrutar de una agradable mañana de fin de semana, ¡nosotros tenemos todo lo que necesitan para comenzar el día con el pie derecho! ¡Los esperamos con los brazos abiertos en Restaurante Pinocho para una experiencia de desayuno que nunca olvidarán!
            </p>
            <span className={styles.precio}>De Lunes a Viernes 3 euros, Sábados, Domingos y festivos 3,30 euros</span>
           
          </div>
        </div>
        <div className={`${styles.row} ${styles.reverse}`}>
          
        {imagen && <img src={imagen} className={styles.image} alt="Imagen de oferta" />}
           
          
          <div className={styles.text}>
            <h2 className={styles.h2}>Plato del día</h2>
            <h3>Acompañamientos</h3>
            {parrafos.filter((_, index) => index < 3).map(parrafo => (
              <p key={parrafo.id} className={styles.textcol}>{parrafo.contenido}</p>
            ))}
            <h3>Principales</h3>
            {parrafos.filter((_, index) => index >= 3 && index < 6).map(parrafo => (
              <p key={parrafo.id} className={styles.textcol}>{parrafo.contenido}</p>
            ))}
          <span className={styles.precio}>Todos los días tu plato del día por 9,90€. También puedes disfrutar de solo el plato principal por 7,00€ </span>
          </div>
        </div>
    </div>
    </>
  );
}
export default Oferts;