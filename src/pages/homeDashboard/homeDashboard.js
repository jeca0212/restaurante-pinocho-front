import styles from './homeDashboard.module.css'; 

export default function AdminDashboard() {
    return (
        <div className={styles.home}>
        <h1 className={styles.title}> Hola Laura, Bienvenida a tu panel de control!</h1>
        <p className={styles.textp}>Desde aquí podrás gestionar tu restaurante de forma sencilla y rápida.</p>
        <p className={styles.textp}>En gestion de reservas podrás aceptar y rechazar las reservas, en gestion de carta, cambia los pdfs fácilemente y en ofertas cambia la imagen y añade tu plato del dia y los precios de las ofertas</p>
        </div>
    )

}