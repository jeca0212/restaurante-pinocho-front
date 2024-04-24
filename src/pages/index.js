import Layout from "../components/Layout";
import Link from 'next/link';
import { HeroSlider } from "@/components/HeroIndex";
import styles from "@/components/BlackButton.module.css";
import stylesIndex from "@/components/index.module.css";
import stylesOrange from "@/components/OrangeButton.module.css";
import { MasonryGallery } from "@/components/gallery";




 const Index = () => {
  return (
    <>
    <Layout>      
    <HeroSlider/>
    <div className={stylesIndex.container}>
      <Link href="/carta" className={styles.button}> <span className={styles.firstbutton}>Ver carta</span> </Link>
      <Link href="/menus" className={styles.button}>Ver menús</Link>
      <Link href="/ofertas" className={styles.button}>Ver ofertas</Link>
    </div>
    <div className={stylesIndex.containerOur}>
      <div className={stylesIndex.leftColumn}>
        <h2 className={stylesIndex.about}>Nosotros</h2>
        <p className={stylesIndex.textabout}>Desde 2012, en el barrio Delicias de Zaragoza, Pinocho ha ofrecido una experiencia culinaria excepcional. Laura Bermejo del Castillo y Rubén Aznar Blanco, con más de 15 años en hostelería, lideran nuestro compromiso con la calidad. Cada plato refleja nuestra pasión por la gastronomía, con ingredientes frescos y atención personalizada. Únete a nosotros y descubre el encanto de Pinocho en cada visita.</p>
        <Link className={stylesOrange.button} href="https://webobook.com/public/60bd0faac1180553c6666e72,en" target="blank"> Visita virtual</Link>
      </div>
      <div className={stylesIndex.rightColumn}>
        <img src="/img/indeximg/nosotros.jpeg" alt="Descripción de la imagen" className={stylesIndex.image} />
      </div>
    </div>
    <div>
    <MasonryGallery/>
    </div>
    </Layout>
    </>
  );
};
export default Index;
