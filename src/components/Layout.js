import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import styles from './Layout.module.css'; // Importa los estilos CSS
import { useEffect } from "react";

const Layout = ({ children }) => {
  useEffect(() => {
    document.body.style.backgroundColor = 'black'; // Aplica el color de fondo al body
    document.body.style.margin = '0'; // Elimina el margen del body
    document.body.style.padding = '0'; // Elimina el relleno del body
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
