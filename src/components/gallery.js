import Masonry from 'react-masonry-css';
import styles from "./gallery.module.css";


export const MasonryGallery = () => {

   

  const breakpointColumnsObj = {
    default: 3, 
    1100: 3,   
    700: 2,     
    500: 1,    
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.myMasonryGrid} 
      columnClassName={styles.myMasonryGridColumn} 
    >
    
      <img
        className={styles.galleryimg}
        src="/img/indeximg/gallery/aperitivo.webp"
        alt="Aperitivo"
      />
      <img
        className={styles.galleryimg}
        src="/img/indeximg/gallery/comer.webp"
        alt="Comer"
      />
      <img
        className={styles.galleryimg}
        src="/img/indeximg/gallery/desayunar.webp"
        alt="Desayunar"
      />
      <img
        className={styles.galleryimg}
        src="/img/indeximg/gallery/tapas.webp"
        alt="Tapas"
      />
      <img
        className={styles.galleryimg}
        src="/img/indeximg/gallery/restaurante.webp"
        alt="Restaurante"
      />
      <img
        className={styles.galleryimg}
        src="/img/indeximg/gallery/postres.webp"
        alt="Postres"
      />
    </Masonry>
  );
};