import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Style from './gestionReservas.module.css';
import Swal from 'sweetalert2';

const GestionReservas = () => {
    const [reservasPendientes, setReservasPendientes] = useState([]);
    const [reservasAceptadas, setReservasAceptadas] = useState([]);
    const [reservasRechazadas, setReservasRechazadas] = useState([]);
    const [mostrarAceptadas, setMostrarAceptadas] = useState(false);
    const [mostrarRechazadas, setMostrarRechazadas] = useState(false);
    const [scoreChange, setScoreChange] = useState({});
    
    useEffect(() => {
        axios.get('https://api.restaurantepinochozaragoza.es/api/reservations?status=pendiente')
            .then(response => {
                setReservasPendientes(response.data);
            });
    }, [reservasAceptadas, reservasRechazadas]);
    const getAceptadas = () => {
      axios.get('https://api.restaurantepinochozaragoza.es/api/reservations?status=aceptado')
          .then(response => {
              setReservasAceptadas(response.data);
              setMostrarAceptadas(prevState => !prevState);
          })
          .catch(error => {
              console.error('Error al obtener las reservas aceptadas:', error);
          });
  };
  
  const getRechazadas = () => {
      axios.get('https://api.restaurantepinochozaragoza.es/api/reservations?status=rechazado')
          .then(response => {
              setReservasRechazadas(response.data);
              setMostrarRechazadas(prevState => !prevState);
          })
          .catch(error => {
              console.error('Error al obtener las reservas rechazadas:', error);
          });
  }; 

    const handleAceptar = (id, score) => {
      axios.put(`https://api.restaurantepinochozaragoza.es/api/reservations/${id}/accept`, { status: 'aceptado', score })
          .then(response => {
              console.log('Reserva aceptada:', response.data);
              Swal.fire(
                '¡Éxito!',
                'Reserva Aceptada con éxito',
                'Recibirás un correo con la información de la reserva',
              );
              setReservasPendientes(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
              setReservasAceptadas(prevReservas => [...prevReservas, response.data]);
          })
          .catch(error => {
              console.error('Error al aceptar la reserva:', error);
          });
  };
  
  const handleRechazar = (id, score) => {
      axios.put(`https://api.restaurantepinochozaragoza.es/api/reservations/${id}/cancel`, { status: 'rechazado', score })
          .then(response => {
              console.log('Reserva rechazada:', response.data);
              Swal.fire(
                '¡Éxito!',
                'Reserva rechazada con éxito',
                'Recibirás un correo con la información de la reserva',
              );
              setReservasPendientes(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
              setReservasRechazadas(prevReservas => [...prevReservas, response.data]);
          })
          .catch(error => {
              console.error('Error al rechazar la reserva:', error);
          });

          
  };

    return (
      <div className={Style.gestionContainer}>
        <h1 className={Style.title}>Reservas pendientes</h1>
    <div className={Style.reservasContainer}>
      
    {reservasPendientes.map(reserva => (
  <div key={reserva.id} className={Style.gestion}>
    <p className={Style.text}>Nombre: {reserva.firstName}</p>
    <p className={Style.text}>Personas: {reserva.people}</p>
    <p className={Style.text}>Fecha: {reserva.date}</p>
    <p className={Style.text}>Teléfono: {reserva.phone}</p>
    <p className={Style.text}>Email: {reserva.email}</p>
    <p className={Style.text}>Hora: {reserva.time}</p>
    <p className={Style.text}>Alergias: {reserva.allergies}</p>
    <p className={Style.text}>Puntos: {reserva.score}</p>
    {reserva.status === 'pendiente' && (
      <div className={Style.ContainerButton}>
        <button className={Style.orangeButton} onClick={() => handleAceptar(reserva.id)}>Aceptar</button>
        <button className={Style.blackButton} onClick={() => handleRechazar(reserva.id)}>Rechazar</button>
      </div>
    )}
    {(reserva.status === 'aceptado' || reserva.status === 'cancelado') && (
      <div className={Style.containerButton}>
        <input type="number" value={scoreChange[reserva.id] || ''} onChange={e => setScoreChange({...scoreChange, [reserva.id]: Number(e.target.value)})} />
    <button onClick={() => handleGuardarScore(reserva.id)}>Guardar</button>
      </div>
    )}
  </div>
))}
    </div>
    <div>
          <div className={Style.ContainerButton}>
    <button className={Style.Button} onClick={getAceptadas}>{mostrarAceptadas ? 'Ocultar reservas aceptadas' : 'Mostrar reservas aceptadas'}</button>
    <button className={Style.Button} onClick={getRechazadas}>{mostrarRechazadas ? 'Ocultar reservas rechazadas' : 'Mostrar reservas rechazadas'}</button>
</div>
              
          </div>
      </div>
  );
          };
export default GestionReservas;
