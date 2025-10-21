# Inventarium - Monorepo (JavaScript)

Sistema de gestión de inventarios con autenticación, control de roles y frontend React. Incluye backend (Node.js + Express + Sequelize) y frontend (React).

---

## 📦 Estructura del Proyecto

```
.
├── backend/   # API REST (Express, Sequelize, PostgreSQL/SQLite)
├── frontend/  # Cliente web (React)
├── README.md  # (este archivo)
├── GUIA_SUSTENTACION.md  # Guía de pruebas y sustentación
└── ...
```

---

## 🚀 Instrucciones Rápidas

### 1. Clonar e instalar dependencias
```bash
# Clona el repo y entra a la carpeta
cd inventarium2

# Backend
cd backend
npm install
cp .env.example .env  # Copia y edita tus variables

# Frontend (opcional)
cd ../frontend
npm install
```

### 2. Configurar variables de entorno (backend)
- Edita `backend/.env` según tu entorno. Ejemplo:
```
DB_NAME=inventarium
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=clave_super_segura
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```
- No subas tu `.env` real al repo.

### 3. Validar entorno automáticamente
```bash
cd backend
npm run doctor
```
- Revisa que todo marque ✅ antes de continuar.

### 4. Ejecutar backend
```bash
cd backend
npm run dev   # desarrollo (nodemon)
# o
npm start     # producción
```
- El backend corre en http://localhost:4000

### 5. Ejecutar frontend (opcional)
```bash
cd frontend
npm start
```
- El frontend corre en http://localhost:3000

### 6. Ejecutar tests (backend)
```bash
cd backend
npm test
npm run test:coverage  # para ver cobertura
```

---

## 🏗️ Arquitectura

### Backend
- Node.js + Express 5
- Sequelize ORM
- PostgreSQL (producción) / SQLite (tests)
- JWT, bcrypt, Joi, dotenv
- Tests: Jest + Supertest

### Frontend
- React 19
- React Router DOM
- Componentes funcionales

---

## 📚 Documentación y recursos
- `README.md` (este): guía unificada de uso y estructura
- `GUIA_SUSTENTACION.md`: explicación de pruebas, cobertura y visión general
- `backend/.env.example`: plantilla de variables de entorno

---

## 📝 Notas
- No subas archivos `.env` reales ni credenciales.
- Usa `npm run doctor` en backend para validar tu entorno antes de correr la app.
- Si tienes dudas sobre pruebas, revisa `GUIA_SUSTENTACION.md`.

---

**Desarrollado con TDD y buenas prácticas.**