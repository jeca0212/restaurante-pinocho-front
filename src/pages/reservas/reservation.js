import React, { useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '@/components/Layout';
import styles from './reservas.module.css'
import stylesReservas from './reservasimg.module.css'
import Confetti from 'react-dom-confetti';

const ReservasPage = () => {
  const [step, setStep] = useState(1);
  const [confetti, setConfetti] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    people: '',
    date: '',
    phone: '',
    email: '',
    time: '',
    allergies: ''
  });

  const config = { // Configuración del confeti
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  const [isAvailable, setIsAvailable] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    localStorage.setItem('reservationData', JSON.stringify(formData));
    setStep(2);
  };

 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
     // Convertir las fechas de inicio y fin de vacaciones a objetos Date
  const vacationStart = new Date('2025-08-11');
  const vacationEnd = new Date('2025-08-029');

  // Convertir la fecha seleccionada por el usuario a objeto Date
  const selectedDate = new Date(formData.date);
  
    // Obtener la fecha y hora actuales
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // Comprobar si la fecha seleccionada es igual a la fecha actual
  const isSameDay = selectedDate.toDateString() === currentDate.toDateString();


  // Comprobar si la fecha seleccionada está dentro del rango de vacaciones
 if (selectedDate >= vacationStart && selectedDate <= vacationEnd) {
    // Mostrar popup y detener ejecución si la fecha está en el rango de vacaciones
   Swal.fire(
      'Cerrado por vacaciones',
      'No aceptamos reservas del 11 de agosto al 29 de Agosto del 2025. ¡Esperamos verte a partir del 1 de septiembre!',
      'info'
    );
    return; // Detener la ejecución de la función
  }
  // Comprobar si la reserva es para el mismo día y después de las 11 de la mañana
  if (isSameDay && currentHour >= 11) {
    Swal.fire(
      'Reservas el mismo día',
      'Las reservas para el mismo día solo se pueden hacer hasta las 11 de la mañana. Para cualquier consulta, llámanos al 659 19 62 12. ¡Gracias!',
      'error'
    );
    return;
  }



    const fetchReservations = async () => {
      try {
        const response = await Axios.get('https://api.restaurantepinochozaragoza.es/api/reservations');
        const espacioDisponible = response.data.espacioDisponible;
        if (espacioDisponible <= 0) {
          setIsAvailable(false);
          Swal.fire(
            'Estamos completos',
            'Por ahora no aceptamos más reservas, gracias y hasta pronto.'
          );
          return;
        }
      } catch (error) {
        Swal.fire(
          'Error',
          'Hubo un error al comprobar la disponibilidad. Por favor, inténtelo de nuevo más tarde.',
          'error'
        );
        return;
      }
    };

    await fetchReservations();

    if (!isAvailable) {
      Swal.fire(
        'Lo sentimos',
        'Estamos completos. Por favor intentelo despues.',
        'error'
      );
      return;
    }

    if (formData.people > 10) {
      Swal.fire({
        title: 'Reserva para grupos grandes',
        text: 'Para reservas de más de 10 personas, se requiere una señal de 5 euros por persona.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Entendido',
      }).then((result) => {
        if (result.isConfirmed) {
          // Continuar con la creación de la reserva sólo si el usuario confirmó
          createReservation(formData);
        }
      });
    } else {
      // Continuar con la creación de la reserva
      createReservation(formData);
    }
  };

  const createReservation = async (data) => {
    Swal.fire({
      title: 'Creando reserva...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false, // Evita que el usuario cierre el SweetAlert haciendo clic fuera
    });

    try {
      const response = await Axios.post('https://api.restaurantepinochozaragoza.es/api/reservations', data);
      console.log(response.data);
      // Comprobar si la reserva se creó con éxito
      if (response.data.message === 'Reservation successfully created.') {
        Swal.close();
        Swal.fire(
          '¡Reserva confirmada!',
          'Hemos enviado un correo electrónico con los detalles de tu reserva.',
          'success'
        );
        setConfetti(true); // Activar el confeti
        setTimeout(() => setConfetti(false), 3000);
      } else {
        throw new Error('La reserva no se creó con éxito.');
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear tu reserva. Por favor, inténtalo de nuevo.',
          icon: 'error',
        });
      }
    }
  };
  
    // if (!authUser) {
    //   return null;
    // } 

  if (step === 1) {
    return (
      <Layout>
        <div className={stylesReservas.reservationContainer}>
          <div className={stylesReservas.container}>
            <h1 className={stylesReservas.title}>Reservas</h1>
            <p className={stylesReservas.text}>¡En Restaurante Pinocho, tu próxima aventura gastronómica comienza con una reserva! No esperes más para descubrir por qué somos la elección predilecta de los amantes de la buena mesa. Estamos emocionados de darte la bienvenida y compartir contigo nuestra pasión por la cocina mediterránea tradicional.</p>
            <form onSubmit={handleSubmit} className={stylesReservas.loginForm}>
              <div className={stylesReservas.formGroup}>
                <label className={stylesReservas.label} htmlFor="firstName">Nombre y apellidos</label>
                <input
                  className={stylesReservas.input}
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Tu nombre y tu apellido"
                  required
                />
              </div>

              <div className={stylesReservas.formGroup}>
                <label className={stylesReservas.label} htmlFor="people">¿Cuántas personas van a venir?</label>
                <input
                  className={stylesReservas.input}
                  type="number"
                  id="people"
                  name="people"
                  value={formData.people}
                  onChange={handleInputChange}
                  placeholder="Incluye a los niños si los hubiera"
                  required
                />
              </div>
              <div className={stylesReservas.formGroup}>
                <label className={stylesReservas.label} htmlFor="date">¿Qué día?</label>
                <input
                  className={stylesReservas.input}
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={stylesReservas.formGroup}>
                <label className={stylesReservas.label} htmlFor="time">¿A qué hora?</label>
                <select
                  className={stylesReservas.input}
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  disabled={!isAvailable}
                >
                  <option value="">Seleccione una hora</option>
                  {Array.from({ length: 9 }, (_, index) => {
                    const time = new Date(0, 0, 0, 13, 0 + 15 * index);
                    const timeString = time.toTimeString().substring(0, 5);
                    return (
                      <option key={timeString} value={timeString}>{timeString}</option>
                    );
                  })}
                </select>
              </div>

              <button type="button" onClick={handleNextStep} className={stylesReservas.loginButton}>Continuar con la reserva</button>
            </form>
          </div>
          <div className={stylesReservas.imageContainer}>
            <img src="/img/reservas/reservasrestaurantepinocho.webp" alt="Descripción de la imagen" className={stylesReservas.reservationImage} />

          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className={styles.container}>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="phone">Indica tu teléfono</label>
              <input
                className={styles.input}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Tu número"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">¿Cuál es tu correo electrónico?</label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Tu email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="allergies">¿Tienes alguna alergia o intolerancia?</label>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="En caso de no tener ninguna alergia o intolerancia, indica
                                “No tengo ninguna alergia o intolerancia”"
                required
              ></textarea>
            </div>
            {isAvailable ? (
              <><button type="submit" className={styles.loginButton}>Reservar</button>
              <Confetti active={confetti} config={config} /></>
            ) : (
              <button type="submit" disabled className={styles.loginButton}>Todo reservado</button>
            )}
            
          </form>
          {/* <div className={styles.registerButtonContainer}>
          <button onClick={handleLogout} className={styles.registerButton}>Cerrar Sesión</button>
          </div> */}
        </div>
      </Layout>
    );
  }
}
export default ReservasPage;

