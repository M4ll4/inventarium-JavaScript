# 🎯 Guía de Pruebas - Selección de Rol en Frontend

## ✅ Funcionalidad Implementada

### Backend (Completado)
- ✅ Validación de máximo 3 administradores
- ✅ API REST con endpoints de registro y login
- ✅ Tests unitarios completos (21 tests pasando)
- ✅ Cobertura de código: 77.77%

### Frontend (Recién Implementado)
- ✅ Selector de rol en formulario de registro
- ✅ Tres opciones disponibles:
  - **Administrador**: Puede crear, editar y eliminar productos
  - **Empleado**: Puede gestionar inventario (por defecto)
  - **Usuario**: Solo puede consultar (sin permisos de edición)
- ✅ Manejo de errores del backend (incluido límite de admins)
- ✅ Estilos CSS mejorados para el formulario

---

## 🧪 Pasos para Probar

### 1. Iniciar Servicios

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
*El servidor backend debe estar corriendo en http://localhost:4000*

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
*El frontend se abrirá automáticamente en http://localhost:3000*

---

### 2. Prueba de Registro con Diferentes Roles

#### Caso 1: Registrar 3 Administradores (✅ Debe funcionar)
1. Ve a http://localhost:3000/register
2. Completa el formulario:
   - **Nombre**: Admin 1
   - **Email**: admin1@test.com
   - **Contraseña**: 123456
   - **Rol**: Administrador
3. Click en "Registrarse"
4. ✅ Resultado esperado: "Registro exitoso! Por favor inicia sesión."

5. Repite con:
   - admin2@test.com (Administrador)
   - admin3@test.com (Administrador)

#### Caso 2: Intentar Registrar un Cuarto Admin (❌ Debe fallar)
1. Ve a http://localhost:3000/register
2. Completa el formulario:
   - **Nombre**: Admin 4
   - **Email**: admin4@test.com
   - **Contraseña**: 123456
   - **Rol**: Administrador
3. Click en "Registrarse"
4. ❌ Resultado esperado: **Error**: "No se pueden registrar más de máximo 3 admins por ejecución"

#### Caso 3: Registrar Empleado (✅ Debe funcionar)
1. Cambia el rol a **Empleado**
2. Usa email: empleado@test.com
3. ✅ Debe registrarse correctamente (sin límite)

#### Caso 4: Registrar Usuario (✅ Debe funcionar)
1. Cambia el rol a **Usuario (solo consulta)**
2. Usa email: usuario@test.com
3. ✅ Debe registrarse correctamente (sin límite)

---

### 3. Prueba de Permisos por Rol

#### Login como Usuario (Solo Consulta)
1. Inicia sesión con usuario@test.com
2. Ve a la lista de productos
3. ❌ No deberías poder crear, editar ni eliminar productos
4. ✅ Solo ver la lista

#### Login como Admin/Empleado
1. Inicia sesión con admin1@test.com
2. ✅ Deberías poder crear, editar y eliminar productos

---

## 🎨 Cambios Visuales

### Nuevo Campo en Formulario de Registro
```
┌─────────────────────────────┐
│        Registro             │
├─────────────────────────────┤
│ Nombre:                     │
│ [_____________________]     │
│                             │
│ Email:                      │
│ [_____________________]     │
│                             │
│ Contraseña:                 │
│ [_____________________]     │
│                             │
│ Rol:                        │
│ [▼ Administrador        ]   │  ← NUEVO CAMPO
│   • Administrador           │
│   • Empleado                │
│   • Usuario (solo consulta) │
│                             │
│   [  Registrarse  ]         │
└─────────────────────────────┘
```

---

## 🔍 Validaciones Implementadas

### Backend
- ✅ Máximo 3 administradores por base de datos
- ✅ Email único
- ✅ Contraseña encriptada con bcrypt
- ✅ Token JWT con información de rol

### Frontend
- ✅ Campos obligatorios (nombre, email, contraseña, rol)
- ✅ Validación de formato de email
- ✅ Mensajes de error claros y visibles
- ✅ Redirección a login después de registro exitoso

---

## 📊 Cobertura de Tests

```
File                | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|--------
All files           |   77.77 |    59.49 |   69.56 |   80.64
backend/controllers |   66.34 |    68.75 |   72.72 |   69.00
  usuarioController |   64.58 |    62.50 |   60.00 |   67.39
```

**Tests pasando:** 21/21 ✅

---

## 🐛 Troubleshooting

### Error: "Cannot connect to backend"
- Verifica que el backend esté corriendo en puerto 4000
- Revisa la consola del navegador (F12) para ver errores de CORS

### Error: El selector de rol no aparece
- Limpia el cache del navegador (Ctrl + Shift + R)
- Verifica que App.css tenga los estilos para `.form-group select`

### Los tests fallan
- Asegúrate de estar en el directorio `backend`
- Ejecuta: `npm test`

---

## 📝 Notas Importantes

- El rol por defecto es "admin" (para facilitar pruebas)
- Los roles son: `admin`, `empleado`, `usuario`
- El límite de 3 admins se aplica por base de datos (no por sesión)
- En pruebas usa SQLite en memoria, en producción usa PostgreSQL

---

## 🎯 Próximos Pasos Sugeridos

1. ✅ Agregar indicador visual del rol actual en el header
2. ✅ Mostrar permisos disponibles según el rol
3. ✅ Agregar página de gestión de usuarios (solo para admins)
4. ✅ Implementar cambio de rol (solo para admins)
5. ✅ Agregar logs de auditoría de cambios de rol

---

## 📞 Soporte

Si encuentras algún problema:
1. Revisa la consola del navegador (F12)
2. Revisa los logs del backend
3. Ejecuta los tests: `npm test`
4. Verifica que todas las dependencias estén instaladas

---

**Fecha de implementación:** 14 de octubre de 2025
**Versión:** 1.0.0
**Estado:** ✅ Listo para pruebas
