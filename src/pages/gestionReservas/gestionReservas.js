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
    const [reservas, setReservas] = useState([]);
    const [scoreChange, setScoreChange] = useState({});
    const [searchDate, setSearchDate] = useState('');
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        axios.get('https://api.restaurantepinochozaragoza.es/api/reservations?status=pendiente')
            .then(response => {
                setReservasPendientes(response.data);
            });
    }, []);

    const handleAceptar = (id, score) => {
      axios.put(`https://api.restaurantepinochozaragoza.es/api/reservations/${id}/accept`, { status: 'aceptado', score })
          .then(response => {
              console.log('Reserva aceptada:', response.data);
              Swal.fire(
                '¡Éxito!',
                'Reserva Aceptada con éxito',
                'Recibirás un correo con la información de la reserva',
              );
              const updatedReservas = reservas.map(reserva => reserva.id === id ? { ...reserva, status: 'aceptado' } : reserva);
              setReservas(updatedReservas);
              setReservasPendientes(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
              setReservasAceptadas(prevReservas => [...prevReservas, response.data]);
          })
          .catch(error => {
              console.error('Error al aceptar la reserva:', error);
          });
    };
    const searchReservations = async () => {
      try {
        const response = await axios.get(`https://api.restaurantepinochozaragoza.es/api/reservations/search-by-date?date=${searchDate}`);
        setReservations(response.data);
      } catch (error) {
        console.error(error);
      }
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
              const updatedReservas = reservas.map(reserva => reserva.id === id ? { ...reserva, status: 'rechazado' } : reserva);
              setReservas(updatedReservas);
              setReservasPendientes(prevReservas => prevReservas.filter(reserva => reserva.id !== id));
              setReservasRechazadas(prevReservas => [...prevReservas, response.data]);
          })
          .catch(error => {
              console.error('Error al rechazar la reserva:', error);
          });
    };
  const handleGuardarScore = (id) => {
    const newScore = scoreChange[id];
    if (newScore === undefined) {
        console.error('newScore es undefined');
        return;
    }
    fetch(`hhttps://api.restaurantepinochozaragoza.es/api/reservations/${id}/score`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score: newScore }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Score actualizado:', data);
      Swal.fire(
        '¡Éxito!',
        'Puntuación cambiada con éxito',
        'success'
      );
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const getAceptadas = () => {
    if (!mostrarAceptadas) {
        axios.get('https://api.restaurantepinochozaragoza.es/api/reservations?status=aceptado')
            .then(response => {
                setReservasAceptadas(response.data);
                setMostrarAceptadas(true);
            });
    } else {
        setReservasAceptadas([]);
        setMostrarAceptadas(false);
    }
};

const getRechazadas = () => {
    if (!mostrarRechazadas) {
        axios.get('https://api.restaurantepinochozaragoza.es/api/reservations?status=cancelado')
            .then(response => {
                setReservasRechazadas(response.data);
                setMostrarRechazadas(true);
            });
    } else {
        setReservasRechazadas([]);
        setMostrarRechazadas(false);
    }
};

    let reservasFiltradas = [...reservasPendientes];

if (mostrarAceptadas) {
    reservasFiltradas = [...reservasFiltradas, ...reservasAceptadas];
}

if (mostrarRechazadas) {
    reservasFiltradas = [...reservasFiltradas, ...reservasRechazadas];
}


    return (
      <div className={Style.gestionContainer}>
      <h1 className={Style.title}>Reservas pendientes</h1>
      <div className={Style.reservasContainer}>
        {reservasFiltradas.filter(reserva => reserva.status === 'pendiente').map(reserva => (
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
        <div className={Style.containerSearch}>
          <input
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            type="date"
            placeholder="Buscar por fecha"
          />
          <button onClick={searchReservations} className={Style.search}>Buscar</button>
          {reservations.length > 0 && (
  <div>
     <div className={Style.reservasContainer}>
    {reservations.map((reserva) => (
      <div key={reserva.id} className={Style.gestion}>
        <p className={Style.text}>Nombre: {reserva.firstName}</p>
        <p className={Style.text}>Personas: {reserva.people}</p>
        <p className={Style.text}>Fecha: {reserva.date}</p>
        <p className={Style.text}>Teléfono: {reserva.phone}</p>
        <p className={Style.text}>Email: {reserva.email}</p>
        <p className={Style.text}>Hora: {reserva.time}</p>
        <p className={Style.text}>Alergias: {reserva.allergies}</p>
        <p className={Style.text}>Puntos: {reserva.score}</p>
        {(reserva.status === 'aceptado' || reserva.status === 'cancelado') && (
              <div className={Style.containerButton}>
                <input type="number" value={scoreChange[reserva.id] || ''} onChange={e => setScoreChange({...scoreChange, [reserva.id]: Number(e.target.value)})} />
                <button onClick={() => handleGuardarScore(reserva.id)}>Guardar</button>
              </div>
            )}
      </div>
    ))}
  </div>
  </div>
)}
        </div>
        <div className={Style.ContainerButton}>
          {/* <button className={Style.Button} onClick={getAceptadas}>{mostrarAceptadas ? 'Ocultar reservas aceptadas' : 'Mostrar reservas aceptadas'}</button>
          <button className={Style.Button} onClick={getRechazadas}>{mostrarRechazadas ? 'Ocultar reservas rechazadas' : 'Mostrar reservas rechazadas'}</button> */}
        </div>
      </div>
    </div>
  );
          };
export default GestionReservas;
