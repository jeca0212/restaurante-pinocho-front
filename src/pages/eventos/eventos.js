import Link from "next/link";
import styles from "./eventos.module.css";


const Events = () => {
  return (
    <>
      <div className={styles.content}>
        <h1 className={styles.title}>Eventos</h1>
        <p className={styles.textp}>
        ¿Estás buscando el lugar perfecto para celebrar una fiesta privada o una celebración especial? ¡Tenemos exactamente lo que necesitas! Te ofrecemos la oportunidad de alquilar nuestro encantador restaurante para una fiesta privada exclusiva, donde podrás disfrutar de un ambiente acogedor y una atmósfera festiva. Con una amplia selección de bebidas y un servicio excepcional, te garantizamos una experiencia inolvidable para ti y tus invitados. Además, para grupos de 10 personas o más, también ofrecemos la opción de reservar una cena con un menú especial diseñado para satisfacer tus gustos culinarios. ¡No esperes más para hacer de tu celebración algo extraordinario! 
        </p>
        <p className={styles.textp}>
        ¡Contáctanos hoy mismo para obtener más información y reservar tu fecha! En Restaurante Pinocho, estamos listos para hacer de tu fiesta privada o celebración un evento inolvidable. ¡Esperamos daros la bienvenida pronto!
        </p>
           <div className={styles.buttonContainer}>
        <Link
              className={styles.button}
              href="/contacto"
             
            >
              Pídenos información
            </Link>
            </div>
    </div>
      <div className={styles.container}>
        <div className={styles.row}>
          <img
            src="/img/eventos/fiesta-pinocho.webp"
            alt="Imagen Descriptiva 1"
            className={styles.image}
          />
              
              <img
            src="/img/eventos/celebraciones.webp"
            alt="Imagen Descriptiva 1"
            className={styles.image}
          />
            {/* <p className={styles.textcol}>
              Disfruta de nuestras deliciosas raciones, cuidadosamente
              elaboradas para satisfacer tu paladar exigente. Ofrecemos una
              variedad de opciones en nuestros menús para que puedas crear tu
              combinación perfecta
            </p> */}
          
          
          </div>
          </div>
    </>
  );
};

export default Events;