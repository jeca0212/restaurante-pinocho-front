import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import styles from './ReservationCancel.module.css';

const ReservationCancel = () => {
  const [reservation, setReservation] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/reservations/${id}`)
        .then(response => response.json())
        .then(data => setReservation(data))
        .catch(error => console.error('Error:', error));
    }
  }, [id]);
  const fieldNamesInSpanish = {
    firstName: 'Nombre',
    people: 'Personas',
    date: 'Fecha',
    phone: 'Teléfono',
    email: 'Correo electrónico',
    time: 'Hora',
    allergies: 'Alergias',
  }

  const handleCancel = async () => {
    if (!reservation) return;

    const result = await Swal.fire({
      title: '¿Estás seguro de que quieres cancelar la reserva?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
    });

    if (result.isConfirmed) {
      const response = await fetch(`http://localhost:8000/api/reservations/${id}/cancelByClient`, {
        method: 'POST',
      });

      if (response.ok) {
        Swal.fire('Cancelado', 'Tu reserva ha sido cancelada.', 'success');
        setIsCancelled(true);
      } else {
        Swal.fire('Error', 'Hubo un error al cancelar la reserva.', 'error');
      }
    }
  };

  if (!reservation) {
    return 'Cargando...';
  }

  if (isCancelled) {
    return (
    <div className={styles.container}>
    <h1>No hay reservas a tu nombre</h1>;
    </div>
    )
  }

  return (
    <div className={styles.container}>
    <h2>Reserva para </h2>
    <p>{fieldNamesInSpanish['firstName']}: {reservation.firstName}</p>
    <p>{fieldNamesInSpanish['date']}: {reservation.date}</p>
    <p>{fieldNamesInSpanish['people']}: {reservation.people}</p>
    <p>{fieldNamesInSpanish['phone']}: {reservation.phone}</p>
    <p>{fieldNamesInSpanish['email']}: {reservation.email}</p>
    <p>{fieldNamesInSpanish['time']}: {reservation.time}</p>
    <p>{fieldNamesInSpanish['allergies']}: {reservation.allergies}</p>
    <button className={styles.button} onClick={handleCancel}>Cancelar reserva</button>
  </div>
  );
}

export default ReservationCancel;