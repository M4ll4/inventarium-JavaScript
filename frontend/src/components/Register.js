import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    rol: 'admin'  // Por defecto creamos admin para pruebas
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/usuarios/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso! Por favor inicia sesión.');
        navigate('/login');
      } else {
        setError(data.mensaje || 'Error en el registro');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Registro</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">Registrarse</button>
        
        <div className="register-link">
          ¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia sesión</span>
        </div>
      </form>
    </div>
  );
}

export default Register;