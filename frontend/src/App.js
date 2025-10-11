import React, { useEffect, useState } from "react";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "./api";
import Login from "./components/Login";

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
      } else {
        const creado = await crearProducto(nuevoProducto);
        if (creado?.id) {
          setProductos((prev) => [...prev, creado]);
        } else {
          console.warn("⚠️ Respuesta inesperada al crear:", creado);
        }
      }
      setNuevoProducto({ nombre: "", descripcion: "", categoria: "", cantidad: "", precio: "", proveedor: "" });
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


  // 🧠 Si no hay token ni rol, muestra el login
  const token = localStorage.getItem("token");
  if (!token) {
    return <Login />;
  }

  // ✅ Render principal
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1 style={{ color: "#2c3e50", textAlign: "center" }}>📦 Gestión de Productos</h1>
      <p style={{ textAlign: "center", color: "#16a085" }}>
        Rol actual: <strong>{rol || "usuario"}</strong>
        <button
        onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        window.location.reload();
  }}
  style={{
    backgroundColor: "#c0392b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  🔒 Cerrar Sesión
</button>
  
      </p>

      {/* 🧩 Solo los administradores pueden crear o editar */}
      {puedeEditar && (
  <form
    onSubmit={manejarEnvio}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      backgroundColor: "#f7f9fa",
      padding: "1rem",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      marginTop: "20px",
    }}
  >
    <input
      type="text"
      placeholder="Nombre del producto"
      value={nuevoProducto.nombre || ""}
      onChange={(e) =>
        setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
      }
      required
    />

    <textarea
      placeholder="Descripción"
      value={nuevoProducto.descripcion || ""}
      onChange={(e) =>
        setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
      }
    />

    <input
      type="text"
      placeholder="Categoría"
      value={nuevoProducto.categoria || ""}
      onChange={(e) =>
        setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
      }
    />

    <input
      type="number"
      placeholder="Cantidad (stock)"
      value={nuevoProducto.cantidad || 0}
      onChange={(e) =>
        setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })
      }
      required
    />

    <input
      type="number"
      step="0.01"
      placeholder="Precio"
      value={nuevoProducto.precio || ""}
      onChange={(e) =>
        setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
      }
      required
    />

    <input
      type="text"
      placeholder="Proveedor"
      value={nuevoProducto.proveedor || ""}
      onChange={(e) =>
        setNuevoProducto({ ...nuevoProducto, proveedor: e.target.value })
      }
    />

    <button
      type="submit"
      style={{
        backgroundColor: editando ? "#f39c12" : "#27ae60",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "0.6rem",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {editando ? "💾 Actualizar Producto" : "➕ Agregar Producto"}
    </button>
  </form>
)}


{/* 📋 Lista de productos */}
 <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
  {Array.isArray(productos) && productos.length > 0 ? (
  productos.map((p, index) =>
  p ? (
  <li
  key={p.id || index}
  style={{
    backgroundColor: "#ecf0f1",
    marginBottom: "10px",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div>
    <strong>{p.nombre}</strong> — ${p.precio}
    <p style={{ margin: "4px 0", color: "#2c3e50", fontSize: "14px" }}>
      <strong>Descripción:</strong> {p.descripcion || "—"}
    </p>
    <p style={{ margin: "4px 0", color: "#2c3e50", fontSize: "14px" }}>
      <strong>Categoría:</strong> {p.categoria || "—"}
    </p>
    <p style={{ margin: "4px 0", color: "#2c3e50", fontSize: "14px" }}>
      <strong>Proveedor:</strong> {p.proveedor || "—"}
    </p>
    <p style={{ margin: "4px 0", color: "#2c3e50", fontSize: "14px" }}>
      <strong>Stock:</strong>{" "}
      <span
        className={`stock-bar ${
          p.cantidad > 20
            ? "stock-alto"
            : p.cantidad > 10
            ? "stock-medio"
            : "stock-bajo"
        }`}
      ></span>{" "}
      ({p.cantidad ?? 0})
    </p>
  </div>

  {/* 🔒 Solo admin puede editar o eliminar */}
  {puedeEditar && (
    <div>
      <button
        onClick={() => manejarEditar(p)}
        style={{
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          cursor: "pointer",
          marginRight: "5px",
        }}
      >
        ✏️ Editar
      </button>
      <button
        onClick={() => manejarEliminar(p.id)}
        style={{
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        🗑️ Eliminar
      </button>
    </div>
  )}
</li>

  ) : null
  )
  ) : (
  <p style={{ textAlign: "center", color: "#7f8c8d" }}>
   No hay productos registrados.
   </p>
  )}
   </ul>
  </div>
  );
}

export default App;
