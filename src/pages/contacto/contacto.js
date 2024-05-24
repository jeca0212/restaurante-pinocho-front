import { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './ContactForm.module.css';
import axios from 'axios';
import Link from 'next/link';


const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
   

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
    
        const response = await axios({
            method: 'post',
            url: 'https://api.restaurantepinochozaragoza.es/api/contact',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name: name,
                email: email,
                message: subject,
            }
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


    // const handleShowBusInfoClick = async () => {
    //     if (!showBusInfo) {
    //         try {
    //             const response = await axios.get(`https://www.zaragoza.es/sede/servicio/urbanismo-infraestructuras/transporte-urbano/linea-autobus/1?fl=c1%2Cc2%2C24%2C42%2C33&rf=html&srsname=wgs84`, {
    //                 headers: {
                        
    //                     'Accept': 'application/geo+json',
                       
    //                 }
    //             });
    //             console.log(response.data);
    //             setBusInfo(response.data);
    //             const title = response.data.properties.title;
    //             //console.log(title);
    //         } catch (error) {
    //             console.error("Error fetching bus info:", error);
    //         }
    //     }
    //     setShowBusInfo(!showBusInfo);
    // };

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
            <div className={styles.h2}>
            <h2 className={styles.title2}>¿Cómo llegar?</h2>
            <ul className={styles.ul}>
                <li className={styles.tel}>Teléfono: <Link className={styles.atel} href="tel:659196212">659 19 62 12</Link> </li>
            </ul>
            </div>
            <div className={styles.map}>
            <iframe className={styles.iframe}
    src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d95398.75461409175!2d-0.9930925034890671!3d41.65118117568068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0xd596b339a39a2a3%3A0xa2b8deeb93f9fd5b!2sCalle%20de%20S.%20Rafael%2C%2027%2C%20Delicias%2C%2050017%20Zaragoza!3m2!1d41.651267!2d-0.9106449999999999!5e0!3m2!1ses!2ses!4v1713515163308!5m2!1ses!2ses" 
   
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
></iframe>
</div>
            
        </div>
    </div>
);
};
export default ContactForm;