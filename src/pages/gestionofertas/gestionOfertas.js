import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from "./gestionOfertas.module.css";
import axios from 'axios';

function Ofertaspinocho() {
  const [parrafos, setParrafos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nuevoContenido, setNuevoContenido] = useState('');
  const [imagen, setImagen] = useState(null);

    const handleChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('image', imagen);
  
      try {
          const res = await axios.post('https://api.restaurantepinochozaragoza.es/api/update-image', formData);
  
          if (res.status === 200) {
              Swal.fire(
                  '¡Éxito!',
                  'Imagen subida con éxito.',
                  'success'
              );
          } else {
              throw new Error('Error al subir la imagen.');
          }
      } catch (err) {
          Swal.fire(
              'Error',
              err.message,
              'error'
          );
      }
  };

  useEffect(() => {
    fetch('https://api.restaurantepinochozaragoza.es/api/parrafos')
      .then(response => response.json())
      .then(data => setParrafos(data));
  }, []);

 

  const handleEdit = (id) => {
    setEditando(id);
    const parrafo = parrafos.find(p => p.id === id);
    setNuevoContenido(parrafo ? parrafo.contenido : '');
  };

  const handleSave = (id) => {
    fetch(`https://api.restaurantepinochozaragoza.es/api/parrafos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenido: nuevoContenido })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se han podido hacer los cambios');
        }
        return response.json();
      })
      .then(data => {
        setParrafos(parrafos.map(p => p.id === id ? data : p));
        setEditando(null);
        Swal.fire('¡Cambios guardados con éxito!', '', 'success');
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  return (
<div className={styles.container}>
    {/* columna1 */}
    <div className={styles.columna}>
        <h1>Cambia la imagen del plato del día</h1>
        <form onSubmit={handleSubmit}>
            <input className={styles.button} type="file" onChange={handleChange} />
            <button className={styles.button} type="submit">Subir imagen</button>
        </form>
    </div>

    {/* columna2 */}
    <div className={styles.columna}>
        <h2>Cambia los platos del día</h2>
        <h3>Acompañamientos</h3>
        {parrafos.slice(0, 3).map(parrafo => (
            <div key={parrafo.id}>
                {editando === parrafo.id ? (
                    <div>
                        <textarea value={nuevoContenido} onChange={e => setNuevoContenido(e.target.value)} />
                        <button className={styles.button} onClick={() => handleSave(parrafo.id)}>Guardar</button>
                    </div>
                ) : (
                    <div>
                        <p>{parrafo.contenido}</p>
                        <button className={styles.button} onClick={() => handleEdit(parrafo.id)}>Editar</button>
                    </div>
                )}
            </div>
        ))}
    </div>

    {/* columna3 */}
    <div className={styles.columna}>
    <h2>Cambia los platos del día</h2>
        <h3>Principales</h3>
        {parrafos.slice(3).map(parrafo => (
            <div key={parrafo.id}>
                {editando === parrafo.id ? (
                    <div>
                        <textarea value={nuevoContenido} onChange={e => setNuevoContenido(e.target.value)} />
                        <button className={styles.button} onClick={() => handleSave(parrafo.id)}>Guardar</button>
                    </div>
                ) : (
                    <div>
                        <p>{parrafo.contenido}</p>
                        <button className={styles.button} onClick={() => handleEdit(parrafo.id)}>Editar</button>
                    </div>
                )}
            </div>
        ))}
    </div>
</div>
  );
}

export default Ofertaspinocho;