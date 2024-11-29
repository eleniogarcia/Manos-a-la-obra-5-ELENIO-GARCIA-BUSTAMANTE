import React, { useState, useEffect } from 'react'; // Importa React y hooks (useState, useEffect)
import './css/SettingsPage.css'; // Importa los estilos específicos para esta página
import Header from '../organism/Header'; // Importa el componente Header que muestra el encabezado de la página

const SettingsPage = () => {
  const [userId, setUserId] = useState(''); // Estado para almacenar el ID del usuario
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [email, setEmail] = useState(''); // Estado para almacenar el email del usuario
  const [name, setName] = useState(''); // Estado para almacenar el nombre completo del usuario
  const token = localStorage.getItem('token'); // Obtiene el token de autenticación desde el almacenamiento local

  useEffect(() => { // useEffect se ejecuta cuando el componente se monta o cuando el valor de 'token' cambia
    const fetchUserData = async () => { // Función asíncrona para obtener los datos del usuario
      try {
        if (!token) { // Si no existe el token en el almacenamiento local, no permite acceder
          console.error('No está autenticado.'); // Muestra un mensaje de error si no está autenticado
          return;
        }

        const userId = localStorage.getItem('userID'); // Obtiene el ID del usuario desde localStorage
        if (!userId) { // Si no se encuentra el ID del usuario, muestra un error
          console.error('No se encontró el ID del usuario en el almacenamiento local.');
          return;
        }

        console.log(`ID del usuario obtenido de localStorage: ${userId}`); // Muestra el ID obtenido en la consola

        // Realiza la solicitud GET al servidor para obtener los datos del usuario
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: 'GET', // Usamos el método GET para obtener los datos
          headers: { // Definimos las cabeceras de la solicitud
            'auth': token, // Se pasa el token de autenticación en el encabezado
            'Content-Type': 'application/json', // El tipo de contenido esperado es JSON
          },
        });

        if (!response.ok) { // Si la respuesta no es exitosa (código de estado no OK), muestra un error
          const errMsg = await response.text(); // Lee el mensaje de error del servidor
          console.error('Error al obtener datos del usuario:', errMsg); // Muestra el error en consola
          return;
        }

        const data = await response.json(); // Convierte la respuesta del servidor en formato JSON y la guarda en data
        if (!data) { // Si no se encuentran datos del usuario, muestra un error
          console.error('No se encontraron datos del usuario.');
          return;
        }

        console.log(data); // Muestro los datos obtenidos en consola

        // Actualiza el estado con los datos del usuario
        setUsername(data.message.username); // Establece el nombre de usuario obtenido en el estado
        setEmail(data.message.email); // Establece el correo electrónico obtenido en el estado
        setName(data.message.name); // Establece el nombre completo obtenido en el estado
      } catch (error) {
        console.error('Error en la solicitud:', error); // Maneja errores durante la solicitud
      }
    };

    fetchUserData(); // Llama a la función para obtener los datos del usuario
  }, [token]); // El efecto depende del valor de 'token'

  const handleLogout = () => { // Función que maneja el cierre de sesión
    if (localStorage) { // Verifica si existe el almacenamiento local
      localStorage.removeItem('token'); // Elimina el token de localStorage para cerrar sesión
      if (window) { // Verifica si el objeto window está disponible
        window.location.href = '/login'; // Redirige al usuario a la página de login
      } else {
        console.error('No se encontró la referencia a la ventana.'); // Muestra un error si window no está disponible
      }
    } else {
      console.error('No se encontró el almacenamiento local.'); // Muestra un error si localStorage no está disponible
    }
  };

  return (
    <div className="settings-page"> {/* Contenedor principal para la página de configuración */}
      <Header title="Mi Perfil"/> {/* Muestra el encabezado con el título "Mi Perfil" */}
      <h1>Mi Perfil</h1> {/* Título principal de la página */}
      <h2></h2> 
      
      {/* Sección de configuración para cada campo */}
      <div className="settings-section">
        <label htmlFor="name">Nombre:</label> {/* Etiqueta asociada al campo de entrada */}
        <input
          type="text" 
          id="name" // Asocia este campo con la etiqueta correspondiente
          value={name} // El valor del campo es el estado 'name'
          onChange={(e) => setName(e.target.value)} // Actualiza el estado con el valor ingresado
        />
      </div>

      <div className="settings-section">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="settings-section">
        <label htmlFor="username">Nombre de Usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="settings-section">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
        />
      </div>

      {/* Sección de acciones con el botón para cerrar sesión */}
      <div className="settings-actions">
        <button onClick={handleLogout} className="logout-btn">
          Cerrar Sesión {/* Botón que al hacer clic ejecuta la función handleLogout */}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage; // Exporta el componente para usarlo en otras partes de la aplicación
