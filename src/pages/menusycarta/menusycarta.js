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
            <input type="file" onChange={(event) => setSelectedFile(event.target.files[0])} />
            <button type="submit">Subir</button>
        </form>
    );
};

export default function Home() {
    return (
        <>
        <div className={styles.title}>
            <h1>Menús y Carta</h1>
            <p>Sube tus pdfs donde más te interese </p>
        </div>
        <div className={styles.container}>
           
        <div className={styles.item}>
          <h2>Subir menú 20</h2>
          <UploadForm route="https://jessica.v2.proyectosdwa.es/public/api/upload/menu20" />
        </div>
        <div className={styles.item}>
          <h2>Subir menú grupo</h2>
          <UploadForm route="https://jessica.v2.proyectosdwa.es/public/api/upload/menugrupo" />
        </div>
        <div className={styles.item}>
          <h2>Subir menú infantil</h2>
          <UploadForm route="https://jessica.v2.proyectosdwa.es/public/api/upload/menuinfantil" />
        </div>
        <div className={styles.item}>
          <h2>Subir raciones</h2>
          <UploadForm route="https://jessica.v2.proyectosdwa.es/public/api/upload/raciones" />
        </div>
        <div className={styles.item}>
          <h2>Subir tapas</h2>
          <UploadForm route="https://jessica.v2.proyectosdwa.es/public/api/upload/tapas" />
        </div>
        <div className={styles.item}>
          <h2>Subir postres</h2>
          <UploadForm route="https://jessica.v2.proyectosdwa.es/public/api/upload/postres" />
        </div>
      </div>
      </>
    );
}