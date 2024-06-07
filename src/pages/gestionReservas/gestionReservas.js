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
    }, []);

    const handleAceptar = (id) => {
      axios.put(`https://api.restaurantepinochozaragoza.es/api/reservations/${id}/accept`, { status: 'aceptado' })
          .then(response => {
              console.log('Reserva aceptada:', response.data);
              Swal.fire(
                '¡Éxito!',
                'Reserva Aceptada con éxito',
                'Recibirás un correo con la información de la reserva',
              );
              setReservasPendientes(reservasPendientes.filter(reserva => reserva.id !== id));
              getAceptadas();
          })
          .catch(error => {
              console.error('Error al aceptar la reserva:', error);
          });
  };
  
  const handleRechazar = (id) => {
      axios.put(`https://api.restaurantepinochozaragoza.es/api/reservations/${id}/cancel`, { status: 'rechazado' })
          .then(response => {
              console.log('Reserva rechazada:', response.data);
              Swal.fire(
                '¡Éxito!',
                'Reserva rechazada con éxito',
                'Recibirás un correo con la información de la reserva',
              );
              setReservasPendientes(reservasPendientes.filter(reserva => reserva.id !== id));
              getRechazadas();
          })
          .catch(error => {
              console.error('Error al rechazar la reserva:', error);
          });
  };

    const getAceptadas = () => {
        axios.get('https://api.restaurantepinochozaragoza.es/api/reservations?status=aceptado')
            .then(response => {
                setReservasAceptadas(response.data);
                setMostrarAceptadas(true);
            });
    };

    const getRechazadas = () => {
        axios.get('https://api.restaurantepinochozaragoza.es/api/reservations?status=rechazado')
            .then(response => {
                setReservasRechazadas(response.data);
                setMostrarRechazadas(true);
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
          <div className={Style.containerButton}>
            <button className={Style.Button} onClick={() => handleAceptar(reserva.id)}>Aceptar</button>
            <button className={Style.Button} onClick={() => handleRechazar(reserva.id)}>Rechazar</button>
          </div>
        </div>
      ))}
    </div>

    <div className={Style.ContainerButton}>
        <button className={Style.Button} onClick={getAceptadas}>{mostrarAceptadas ? 'Ocultar reservas aceptadas' : 'Mostrar reservas aceptadas'}</button>
        <button className={Style.Button} onClick={getRechazadas}>{mostrarRechazadas ? 'Ocultar reservas rechazadas' : 'Mostrar reservas rechazadas'}</button>
      </div>
  
      <div>
        {mostrarAceptadas && (
          <>
            <h1 className={Style.title}>Reservas aceptadas</h1>
            <div className={Style.reservasContainer}>
              {reservasAceptadas.map(reserva => (
                <div key={reserva.id} className={Style.gestion}>
                   <p className={Style.text}>Nombre: {reserva.firstName}</p>
          <p className={Style.text}>Personas: {reserva.people}</p>
          <p className={Style.text}>Fecha: {reserva.date}</p>
          <p className={Style.text}>Teléfono: {reserva.phone}</p>
          <p className={Style.text}>Email: {reserva.email}</p>
          <p className={Style.text}>Hora: {reserva.time}</p>
          <p className={Style.text}>Alergias: {reserva.allergies}</p>
          <p className={Style.text}>Puntos: {reserva.score}</p>
                  <button onClick={() => handleGuardarScore(reserva.id)}>Guardar</button>
                </div>
              ))}
            </div>
          </>
        )}
  
        {mostrarRechazadas && (
          <>
            <h1 className={Style.title}>Reservas rechazadas</h1>
            <div className={Style.reservasContainer}>
              {reservasRechazadas.map(reserva => (
                <div key={reserva.id} className={Style.gestion}>
                   <p className={Style.text}>Personas: {reserva.people}</p>
          <p className={Style.text}>Fecha: {reserva.date}</p>
          <p className={Style.text}>Teléfono: {reserva.phone}</p>
          <p className={Style.text}>Email: {reserva.email}</p>
          <p className={Style.text}>Hora: {reserva.time}</p>
          <p className={Style.text}>Alergias: {reserva.allergies}</p>
          <p className={Style.text}>Puntos: {reserva.score}</p>
                  <button onClick={() => handleGuardarScore(reserva.id)}>Guardar</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>


  
);
};
export default GestionReservas;
