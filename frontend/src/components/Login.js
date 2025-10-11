import React, { useState } from "react";
import { login, setToken } from "../api";

function Login() {
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
        marginBottom: "2rem",
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      <h2>🔐 Iniciar Sesión</h2>
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
    </div>
  );
}

export default Login;
