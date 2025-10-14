import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { login, setToken } from "../api";
import "../App.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarLogin = async (e) => {
    e.preventDefault();

    try {
      // Enviar los mismos nombres que el backend espera
      const data = await login({ email: correo, contraseña: password });

      if (data.token) {
        console.log("🔑 Token recibido del servidor:", data.token);

        // Guardar token y rol en localStorage
        setToken(data.token);
        if (data.rol) {
          localStorage.setItem("rol", data.rol);
          console.log("🧩 Rol recibido:", data.rol);
        } else {
          console.warn("⚠️ No se recibió rol del servidor");
        }

        setMensaje("Inicio de sesión exitoso");
        onLogin(); // Notificar al componente padre que el login fue exitoso
      } else {
        setMensaje("No se recibió token del servidor");
      }
    } catch (error) {
      console.error("Error en login:", error);
      setMensaje("⚠️ Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={manejarLogin} className="login-form">
        <h2>🔐 Iniciar Sesión</h2>
        {mensaje && <div className="error-message">{mensaje}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="login-button">Iniciar sesión</button>
        
        <div className="register-link">
          ¿No tienes cuenta? <button type="button" onClick={() => navigate('/register')} style={{background:'none',border:'none',color:'#3498db',cursor:'pointer',padding:0}}>Regístrate aquí</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
