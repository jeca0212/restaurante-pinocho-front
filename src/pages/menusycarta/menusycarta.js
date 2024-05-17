import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './menusycarta.module.css';

const UploadForm = ({ route }) => {
    const [selectedFile, setSelectedFile] = useState();

    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('pdf', selectedFile);

        try {
            const response = await axios.post(route, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                Swal.fire(
                    '¡Éxito!',
                    'Archivo subido con éxito',
                    'success'
                );
            } else {
                Swal.fire(
                    'Error',
                    'No se ha subido ningún archivo',
                    'error'
                );
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error',
                'Ha ocurrido un error al subir el archivo',
                'error'
            );
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input className={styles.fileInput} type="file" onChange={(event) => setSelectedFile(event.target.files[0])} />
            <button className={styles.submitButton} type="submit">Subir</button>
        </form>
    );
};

export default function Home() {
    return (
        <>
        <div className={styles.ContainerFluid}>
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>Menús y Carta</h1>
            <p className={styles.text}>Sube tus pdfs donde más te interese </p>
        </div>
        <div className={styles.container}>
           
        <div className={styles.item}>
          <h2>Subir menú 20</h2>
          <UploadForm route="http://localhost:8000/api/upload/menu20" />
        </div>
        <div className={styles.item}>
          <h2>Subir menú grupo</h2>
          <UploadForm route="http://localhost:8000/api/upload/menugrupo" />
        </div>
        <div className={styles.item}>
          <h2>Subir menú infantil</h2>
          <UploadForm route="http://localhost:8000/api/upload/menuinfantil" />
        </div>
        <div className={styles.item}>
          <h2>Subir raciones</h2>
          <UploadForm route="http://localhost:8000/api/upload/raciones" />
        </div>
        <div className={styles.item}>
          <h2>Subir tapas</h2>
          <UploadForm route="http://localhost:8000/api/upload/tapas" />
        </div>
        <div className={styles.item}>
          <h2>Subir postres</h2>
          <UploadForm route="http://localhost:8000/api/upload/postres" />
        </div>
      </div>
      </div>
      </>
    );
}