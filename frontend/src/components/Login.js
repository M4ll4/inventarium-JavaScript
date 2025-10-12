import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, setToken } from "../api";

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
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "1.5rem" }}>
        🔐 Iniciar Sesión
      </h2>
      <form onSubmit={manejarLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          style={{ display: "block", margin: "8px 0", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "8px 0", padding: "8px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Iniciar sesión
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <button onClick={() => navigate("/register")}>
        Registrarse
      </button>
    </div>
  );
}

export default Login;
