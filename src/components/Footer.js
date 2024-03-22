import styles from "@/components/BlackButton.module.css";
import stylesFooter from "@/components/Footer.module.css";
import Link from "next/link";

export const Footer = ()=>{
    return  (
        <>
        <div className={stylesFooter.containerjusteat}>
      <div className={stylesFooter.leftColumn}>
      <img src="/img/footer/just-eat.webp" alt="Descripción de la imagen" className={stylesFooter.image} />
        <p className={stylesFooter.justeat}>Disfruta de nuestros platos en casa  </p>
        
      </div>
      <div className={stylesFooter.rightColumn}>
      <Link href="https://www.just-eat.es/restaurants-restaurante-pinocho-zaragoza/menu" className={styles.button}>Just Eat</Link>
      <Link href="/reservas" className={styles.button}>Reserva ya</Link>
      </div>
    </div>

    <footer className={stylesFooter.footer}>
      <div className={stylesFooter.column}>
        <div><Link className={stylesFooter.Link} href="/aviso-legal">Aviso Legal</Link>
        </div>
        <div>
        <Link className={stylesFooter.Link} href="/politica-de-cookies">Política de Cookies</Link>
      </div>
      </div>
      <div className={stylesFooter.column}>
        <p>Redes Sociales</p>
        <Link className={stylesFooter.rrss} href="https://www.facebook.com/p/Restaurante-Pinocho-Gastro-100063527802390/">
          <img className={stylesFooter.rrss} src="/img/footer/facebook.webp" alt="Instagram" />
        </Link>
        <Link className={stylesFooter.rrss} href="https://www.instagram.com/restaurante_pinocho/">
          <img className={stylesFooter.rrss} src="/img/footer/instagram.webp" alt="Facebook" />
        </Link>
      </div>
      <div className={stylesFooter.column}>
        <img  className={stylesFooter.logo} src="/img/logo_pinocho.webp" alt="Logotipo del Restaurante" width={100} height={100} />
      </div>
    </footer>
        </>
    )
}
