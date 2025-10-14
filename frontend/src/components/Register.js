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
      console.error('Error en registro:', error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Registro</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          >
            <option value="admin">Administrador</option>
            <option value="empleado">Empleado</option>
            <option value="usuario">Usuario (solo consulta)</option>
          </select>
        </div>

        <button type="submit" className="login-button">Registrarse</button>
        
        <div className="register-link">
          ¿Ya tienes cuenta? <button type="button" onClick={() => navigate('/login')} style={{background:'none',border:'none',color:'#3498db',cursor:'pointer',padding:0}}>Inicia sesión</button>
        </div>
      </form>
    </div>
  );
}

export default Register;

// Register no recibe props actualmente; si más adelante se agregan, definir PropTypes aquí.