import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./api";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", descripcion: "", categoria: "", cantidad: "", precio: "", proveedor: "" });
  const [editando, setEditando] = useState(null);
  const [autenticado, setAutenticado] = useState(false);

  // 🔐 Rol y permisos
  const rol = localStorage.getItem("rol");
  const puedeEditar = rol === "admin";


  // ✅ Cargar productos al iniciar
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos();
        console.log("📦 Datos recibidos del backend:", data);

        if (Array.isArray(data)) {
          setProductos(data.filter((p) => p && p.nombre));
        } else if (data?.productos && Array.isArray(data.productos)) {
          setProductos(data.productos.filter((p) => p && p.nombre));
        } else {
          console.warn("⚠️ Estructura inesperada:", data);
          setProductos([]);
        }
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    cargarProductos();
  }, []);

  // ✅ Crear o actualizar producto
  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        const actualizado = await actualizarProducto(editando.id, nuevoProducto);
        if (actualizado?.producto) {
          setProductos((prev) =>
            prev.map((p) => (p.id === editando.id ? actualizado.producto : p))
          );
        } else {
          console.warn("⚠️ Respuesta inesperada al actualizar:", actualizado);
        }
        setEditando(null);
        setNuevoProducto({ nombre: "", descripcion: "", categoria: "", cantidad: "", precio: "", proveedor: "" });
      } else {
        const creado = await crearProducto(nuevoProducto);
        if (creado?.id) {
          setProductos((prev) => [...prev, creado]);
          setNuevoProducto({ nombre: "", descripcion: "", categoria: "", cantidad: "", precio: "", proveedor: "" });
        } else {
          console.warn("⚠️ Respuesta inesperada al crear:", creado);
        }
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  // ✅ Eliminar producto
  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await eliminarProducto(id);
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // ✅ Activar modo edición
  const manejarEditar = (producto) => {
   if (!producto) return;
    setEditando(producto);
   setNuevoProducto({
     nombre: producto.nombre || "",
     descripcion: producto.descripcion || "",
     categoria: producto.categoria || "",
     cantidad: producto.cantidad || "",
     precio: producto.precio || "",
     proveedor: producto.proveedor || "",
  });
};


  // Verificar autenticación al iniciar
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAutenticado(!!token);
  }, []);

  // ✅ Render principal con enrutador
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          autenticado ? <Navigate to="/" /> : <Login onLogin={() => setAutenticado(true)} />
        } />
        <Route path="/register" element={
          autenticado ? <Navigate to="/" /> : <Register />
        } />
        <Route path="/" element={
          <HomePage
            autenticado={autenticado}
            rol={rol}
            puedeEditar={puedeEditar}
            productos={productos}
            nuevoProducto={nuevoProducto}
            setNuevoProducto={setNuevoProducto}
            manejarEnvio={manejarEnvio}
            manejarEditar={manejarEditar}
            manejarEliminar={manejarEliminar}
            editando={editando}
            setEditando={setEditando}
            setAutenticado={setAutenticado}
          />
        } />
      </Routes>
    </Router>
  );


}

export default App;
