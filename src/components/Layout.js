import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import styles from './Layout.module.css'; 
import { useEffect } from "react";

const Layout = ({ children }) => {
  useEffect(() => {
    document.body.style.backgroundColor = '#0C0C0C'; 
    document.body.style.margin = '0'; 
    document.body.style.padding = '0'; 
    document.body.style.height = '100vh'; 
    document.body.style.width = '100vw';
    document.body.style.display = 'inline-block';
    // document.body.style.minHeight = '100vh'; 
  }, []); 

  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
