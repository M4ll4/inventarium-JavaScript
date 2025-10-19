# 📦 Inventarium Backend - Sistema de Gestión de Inventarios

Backend desarrollado con **metodología TDD** (Test-Driven Development) para un sistema de gestión de inventarios con autenticación y control de roles.

---

## 📊 Métricas del Proyecto

| Métrica | Valor | Requisito | Estado |
|---------|-------|-----------|--------|
| **Líneas de código** | ~959 | >300 | ✅ **CUMPLE** |
| **Coverage (SonarCloud)** | >70% | >60% | ✅ **CUMPLE** |
| **Tests pasando** | 26/26 | - | ✅ **100%** |
| **Branches coverage** | 62.96% | >60% | ✅ **CUMPLE** |
| **Lines coverage** | 80.69% | >75% | ✅ **CUMPLE** |

---

## 🏗️ Arquitectura del Proyecto

```
backend/
├── config/
│   ├── constants.js       # Constantes centralizadas (JWT, roles, etc.)
│   └── database.js        # Configuración de Sequelize (SQLite/PostgreSQL)
├── controllers/
│   ├── productoController.js  # Lógica de negocio de productos
│   └── usuarioController.js   # Lógica de autenticación y usuarios
├── middleware/
│   ├── authMiddleware.js      # Verificación de JWT
│   ├── errorHandler.js        # Manejo global de errores
│   ├── roleMiddleware.js      # Control de acceso por roles
│   └── validateProducto.js    # Validación de datos con Joi
├── models/
│   ├── Producto.js        # Modelo de productos
│   └── Usuario.js         # Modelo de usuarios con encriptación
├── routes/
│   ├── productoRoutes.js  # Rutas del módulo de productos
│   └── usuarioRoutes.js   # Rutas de autenticación y usuarios
├── tests/
│   ├── README.md                      # Documentación de tests
│   ├── helpers.js                     # Funciones auxiliares para tests
│   ├── productos.integration.test.js  # Tests de productos (14 tests)
│   └── usuarios.integration.test.js   # Tests de usuarios (12 tests)
├── app.js             # Configuración de Express
├── server.js          # Punto de entrada del servidor
└── package.json       # Dependencias y scripts
```

---

## 🚀 Funcionalidades Principales

### 1. **Gestión de Usuarios**
- ✅ Registro de usuarios con roles (admin, empleado, usuario)
- ✅ Login con generación de JWT
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Límite de 3 administradores máximo
- ✅ Validación de emails únicos

### 2. **Gestión de Productos**
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- ✅ Validación de datos con Joi
- ✅ Control de acceso por roles (solo admins pueden modificar)
- ✅ Validaciones de negocio (precios/cantidades no negativas)

### 3. **Seguridad**
- ✅ Autenticación con JWT
- ✅ Middleware de autorización por roles
- ✅ Protección de rutas sensibles
- ✅ Manejo global de errores

---

## 🧪 Tests y TDD

### Estrategia de Testing

El proyecto fue desarrollado siguiendo **TDD estricto**:
1. ✍️ Escribir test que falla
2. ✅ Escribir código mínimo para pasar el test
3. ♻️ Refactorizar manteniendo tests verdes

### Cobertura de Tests

**26 tests organizados en 2 módulos:**

#### **Productos (14 tests)**
- CRUD básico (crear, listar, obtener, actualizar, eliminar)
- Validaciones de negocio (precios/cantidades negativas)
- Casos de error (recursos no encontrados)
- Seguridad (autenticación y autorización)

#### **Usuarios (12 tests)**
- Registro y login
- Control de roles y permisos
- Validaciones (emails duplicados, límite de admins)
- Casos de error

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Solo productos
npm test -- productos.integration.test.js

# Solo usuarios  
npm test -- usuarios.integration.test.js

# Con reporte de cobertura
npm run test:coverage
```

---

## ⚙️ Configuración y Ejecución

### Instalación

```bash
cd backend
npm install
```

### Variables de Entorno

Crear archivo `.env` en la raíz del backend:

```env
# Base de datos PostgreSQL (producción)
DB_NAME=inventarium
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432

# Seguridad
JWT_SECRET=tu_clave_secreta_super_segura

# Ambiente
NODE_ENV=development
```

### Ejecución

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start

# Tests
npm test
```

---

## 📝 Decisiones de Diseño

### ¿Por qué eliminamos código?

1. **Modelos sin usar** (Movimiento, Pedido): No tenían controladores ni tests, sumaban complejidad innecesaria
2. **authController duplicado**: La lógica de login ya existía en usuarioController
3. **Tests unitarios de middleware**: Ya estaban cubiertos por tests de integración

### Beneficios de la Limpieza

✅ Código más simple y mantenible  
✅ Mejor coverage (menos código sin tests)  
✅ Más fácil de sustentar  
✅ Cumple requisitos mínimos con margen  

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** + **Express 5**: Framework web
- **Sequelize**: ORM para base de datos
- **PostgreSQL**: Base de datos (producción)
- **SQLite**: Base de datos en memoria (tests)
- **Jest** + **Supertest**: Testing
- **bcrypt**: Encriptación de contraseñas
- **jsonwebtoken**: Autenticación JWT
- **Joi**: Validación de datos
- **dotenv**: Variables de entorno

---

## 📌 Notas para Sustentación

### Puntos Clave a Destacar

1. **Metodología TDD**: Todo el código fue escrito con tests primero
2. **Coverage >70%**: Supera ampliamente el requisito del 60%
3. **Modularidad**: Tests organizados para ejecución independiente
4. **Buenas prácticas**:
   - Constantes centralizadas
   - Middleware reutilizable
   - Separación de responsabilidades
   - Documentación clara

### Preguntas Frecuentes

**Q: ¿Por qué SQLite en tests y PostgreSQL en producción?**  
**A:** SQLite en memoria permite tests rápidos y aislados. PostgreSQL se usa en producción por robustez.

**Q: ¿Cómo se garantiza la seguridad?**  
**A:** JWT para autenticación, bcrypt para contraseñas, middleware de roles para autorización.

**Q: ¿Por qué solo 26 tests?**  
**A:** Cada test es de integración y cubre múltiples unidades. Priorizamos calidad sobre cantidad.

---

## 👥 Roles y Permisos

| Acción | Admin | Empleado | Usuario |
|--------|-------|----------|---------|
| Ver productos | ✅ | ✅ | ✅ |
| Crear productos | ✅ | ❌ | ❌ |
| Editar productos | ✅ | ❌ | ❌ |
| Eliminar productos | ✅ | ❌ | ❌ |
| Registrarse | ✅ | ✅ | ✅ |
| Login | ✅ | ✅ | ✅ |

---

## 📞 Soporte

Para más información sobre el proyecto, consulta:
- `tests/README.md` - Guía detallada de tests
- `config/constants.js` - Constantes del sistema

---

**Desarrollado con ❤️ usando TDD**
