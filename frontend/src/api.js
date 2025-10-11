const API_URL = "http://localhost:4000/api";

let token = null;

// Guardar token en memoria y en localStorage
export function setToken(nuevoToken) {
  token = nuevoToken;
  localStorage.setItem("token", nuevoToken);
}

// Obtener token desde localStorage al cargar (por si se recarga la página)
(function cargarToken() {
  const guardado = localStorage.getItem("token");
  if (guardado) token = guardado;
})();

// Iniciar sesión
export async function login(datos) {
  const respuesta = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  // Si hay error 4xx o 5xx, lanzamos mensaje descriptivo
  if (!respuesta.ok) {
    const texto = await respuesta.text();
    console.error("Error en login:", texto);
    throw new Error("Error al iniciar sesión");
  }

  const data = await respuesta.json();

  // Guardar token en memoria y localStorage
  setToken(data.token);
  return data;
}

// Obtener productos (requiere token)
export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`, {
    headers: {
      "Authorization": token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (respuesta.status === 401) {
    throw new Error("No autorizado: token inválido o expirado");
  }

  if (!respuesta.ok) {
    throw new Error("Error al obtener los productos");
  }

  return respuesta.json();
}

// Crear nuevo producto (requiere token)
export async function crearProducto(producto) {
  const respuesta = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(producto),
  });

  if (!respuesta.ok) {
    throw new Error("Error al crear el producto");
  }

  return respuesta.json();
}

// Actualizar producto
export async function actualizarProducto(id, datos) {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new Error("Error al actualizar el producto");
  }

  return respuesta.json();
}

// Eliminar producto
export async function eliminarProducto(id) {
  const respuesta = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!respuesta.ok) {
    throw new Error("Error al eliminar el producto");
  }

  return respuesta.json();
}