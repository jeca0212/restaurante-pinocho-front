import { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './ContactForm.module.css';
import axios from 'axios';


const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [showBusInfo, setShowBusInfo] = useState(false); 
    const [busInfo, setBusInfo] = useState(null);

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case 'name':
                setName(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            case 'subject':
                setSubject(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('https://jessica.v2.proyectosdwa.es/public/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: subject,
        
            }),
        });


        if (response.ok) {
            Swal.fire(
                'Enviado',
                'Tu mensaje ha sido enviado correctamente',
                'success'
            );
        } else {
            Swal.fire(
                'Error',
                'Hubo un problema al enviar tu mensaje',
                'error'
            );
        }
    };


    const handleShowBusInfoClick = async () => {
        if (!showBusInfo) {
            try {
                const response = await axios.get(`https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/linea-autobus/1?fl=c1%2Cc2%2C24%2C42%2C33&rf=html&srsname=wgs84`, {
                    headers: {
                        
                        'Accept': 'application/geo+json',
                       
                    }
                });
                console.log(response.data);
                setBusInfo(response.data);
                const title = response.data.properties.title;
                //console.log(title);
            } catch (error) {
                console.error("Error fetching bus info:", error);
            }
        }
        setShowBusInfo(!showBusInfo);
    };

    return (
        <div className={styles.container}>
        
        <div className={styles.formContainer}>
        <h1 className={styles.title}>Contacta con nosotros</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
               
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name.name}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Tu nombre"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={name.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Tu correo electrónico"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>Mensaje</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={name.subject}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Asunto de tu mensaje"
                        required
                    />
                </div>
                <button type="submit" onTouchEnd={handleSubmit} className={styles.submitButton}>Enviar</button>
            </form>
        </div>
        <div className={styles.mapAndBusInfo}>
            <img src="/img/contacto/comollegarrestaurantepinocho.png" alt="Cómo llegar" className={styles.mapImage} />
            <button onClick={handleShowBusInfoClick} className={styles.busInfoButton}>
                {showBusInfo ? "Ocultar Líneas de Autobús" : "¿Cómo llegar?"}
            </button>
            {showBusInfo && busInfo && (
                <div className={styles.busInfo}>
                    <h2 className={styles.titlep}>Información de la Línea de Autobús</h2>
                    <p>{busInfo.id} </p>
                </div>
            )}
            {showBusInfo && !busInfo && <p className={styles.titlep}>Cargando información de la línea...</p>}
        </div>
    </div>
);
};
export default ContactForm;