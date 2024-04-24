import styles from "./ofertas.module.css";

const Oferts= () => {  
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
            <spam className={styles.precio}>De Lunes a Viernes 3 euros, Sábados, Domingos y festivos 3,30 euros</spam>
           
          </div>
        </div>
        <div className={`${styles.row} ${styles.reverse}`}>
          <img
            src="/img/ofertas/principal.jpg"
            alt="Imagen Descriptiva 2"
            className={styles.image}
          />
          <div className={styles.text}>
          <h2  className={styles.h2}>Plato del día</h2>
          <h3>Acompañamientos</h3>
            <p className={styles.textcol}>
             Ensalada
            </p>
            <p className={styles.textcol}>
             Macarrones con tomate y queso
            </p>
            <p className={styles.textcol}>
             Caldo
            </p>
            <h3>Principales</h3>
            <p className={styles.textcol}>
             Ensalada
            </p>
            <p className={styles.textcol}>
             Macarrones con tomate y queso
            </p>
            <p className={styles.textcol}>
             Caldo
            </p>
          
          </div>
        </div>
    </div>
    </>
  );
}
export default Oferts;