import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import styles from './Layout.module.css'; 
import { useEffect } from "react";
import Head from "next/head";
import Swal from 'sweetalert2';

const Layout = ({ children }) => {
  useEffect(() => {
    // document.body.style.backgroundColor = '#0C0C0C'; 
     document.body.style.margin = '0'; 
     document.body.style.padding = '0'; 
    // document.body.style.height = '100vh'; 
    // document.body.style.width = '100vw';
    // document.body.style.display = 'inline-block';
    //document.body.style.minHeight = '100vh'; 
    //VACACIONES
  //  Swal.fire({
    // title: 'Vacaciones',
      //text: 'El restaurante Pinocho estará cerrado por vacaciones del 11 al 29 de Agosto. ¡Nos vemos el 1 de septiembre en nuestro horario habitual!',
     //icon: 'info',
      //confirmButtonText: 'Entendido'
     //});
  }, []); 
  

  return (
    <>   <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0  minimum-scale=1.0" />
        <link rel="icon" href="/pinocho.png" type="image/png"/>
        <title>Restaurante Pinocho | Zaragoza</title>
        <meta name="description" content="¡Descubre la auténtica cocina mediterránea en Restaurante Pinocho, calle San Rafael 27, Delicias, Zaragoza! ¡Haz tu reserva y déjate sorprender!" />
        <meta name="keywords" content="restaurante, pinocho, zaragoza, cocina, mediterranea" />
        <meta name="robots" content="index, follow"/>
      </Head>
      
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
    
    </>
  );
};

export default Layout;
