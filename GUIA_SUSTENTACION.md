# 🎯 Guía Rápida de Comandos para Sustentación

## 📋 Comandos Esenciales

### 1. Ejecutar Todos los Tests
```bash
cd backend
npm test
```
**Resultado esperado:** ✅ 26 tests pasando

---

### 2. Ver Coverage Detallado
```bash
cd backend
npm run test:coverage
```
**Métricas actuales:**
- Statements: 77.25%
- Branches: 62.96%
- Functions: 66.66%
- Lines: 80.69%

---

### 3. Ejecutar Tests de Productos Solamente
```bash
cd backend
npm test -- productos.integration.test.js
```
**Resultado esperado:** ✅ 14 tests de productos

---

### 4. Ejecutar Tests de Usuarios Solamente
```bash
cd backend
npm test -- usuarios.integration.test.js
```
**Resultado esperado:** ✅ 12 tests de usuarios

---

### 5. Iniciar el Servidor (Modo Desarrollo)
```bash
cd backend
npm run dev
```
**Puerto por defecto:** http://localhost:3000

---

### 6. Contar Líneas de Código
```bash
cd backend
find . -path ./node_modules -prune -o -path ./coverage -prune -o -name "*.js" -print | xargs wc -l | tail -1
```
**Resultado esperado:** ~959 líneas totales

---

### 7. Ver Estructura del Proyecto
```bash
cd backend
tree -L 2 -I 'node_modules|coverage'
```
O en Windows:
```bash
ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'
```

---

### 8. Verificar Archivos Eliminados
```bash
cd backend
# Estos comandos deben retornar "No such file"
ls models/Movimiento.js 2>&1
ls models/Pedido.js 2>&1
ls controllers/authController.js 2>&1
ls routes/authRoutes.js 2>&1
```

---

## 🎬 Demo en Vivo

### Flujo Completo de Demostración (5 minutos)

```bash
# 1. Mostrar estructura
cd backend
ls -la

# 2. Ejecutar tests
npm test

# 3. Mostrar coverage
npm run test:coverage

# 4. Demostrar test específico
npm test -- productos.integration.test.js

# 5. Abrir coverage HTML
open coverage/index.html  # MacOS/Linux
start coverage/index.html # Windows
```

---

## 📊 Demostración de Tests Modulares

### Caso de Uso: "Quiero ver solo tests de productos"
```bash
cd backend
npm test -- productos.integration.test.js
```
**Ventaja:** Ejecuta solo 14 tests en lugar de 26

### Caso de Uso: "Quiero ver solo tests de usuarios"
```bash
cd backend
npm test -- usuarios.integration.test.js
```
**Ventaja:** Ejecuta solo 12 tests en lugar de 26

### Caso de Uso: "Quiero ejecutar un test específico"
```bash
cd backend
npm test -- -t "Debería registrar un nuevo usuario"
```
**Ventaja:** Ejecuta un único test por nombre

---

## 🔍 Verificación de Requisitos

### Requisito 1: Mínimo 300 líneas de código
```bash
cd backend
find . -path ./node_modules -prune -o -path ./coverage -prune -o -name "*.js" -print | xargs wc -l | tail -1
```
**✅ Resultado:** ~959 líneas (319% del mínimo)

### Requisito 2: Coverage >60%
```bash
cd backend
npm run test:coverage | grep "Statements"
```
**✅ Resultado:** 77.25% (>60% requerido)

### Requisito 3: Metodología TDD
**✅ Demostración:** 
1. Abrir `tests/productos.integration.test.js`
2. Mostrar tests antes del código
3. Explicar flujo Red-Green-Refactor

---

## 🐛 Troubleshooting

### Si los tests fallan:

1. **Verificar instalación:**
```bash
cd backend
npm install
```

2. **Limpiar cache:**
```bash
cd backend
npm cache clean --force
rm -rf node_modules
npm install
```

3. **Verificar variables de entorno:**
```bash
cat backend/.env
# Debe tener NODE_ENV=test para tests
```

---

## 📈 Mostrar Mejoras del Código

### Antes de Limpieza:
- ❌ 1,132 líneas (con código sin usar)
- ❌ 36 tests (10 redundantes)
- ❌ Modelos sin implementar (Movimiento, Pedido)
- ❌ Controllers duplicados

### Después de Limpieza:
- ✅ 959 líneas (solo código útil)
- ✅ 26 tests (sin redundancia)
- ✅ Solo modelos implementados
- ✅ Sin duplicación

---

## 🎓 Preguntas Frecuentes en Sustentación

### P: ¿Por qué bajó el coverage?
**R:** Se eliminó código sin usar que no tenía tests. El coverage sigue siendo >60% requerido.

### P: ¿Por qué menos tests?
**R:** Eliminamos 10 tests unitarios que eran redundantes con tests de integración.

### P: ¿Dónde están los modelos Movimiento y Pedido?
**R:** Se eliminaron porque no tenían funcionalidad implementada (sin controllers, rutas ni tests).

### P: ¿Cómo ejecuto solo un test?
**R:** `npm test -- productos.integration.test.js` o `npm test -- -t "nombre del test"`

### P: ¿Qué base de datos usa?
**R:** SQLite en memoria para tests, PostgreSQL para producción.

---

## 🚀 Comandos Extra Útiles

### Ver reporte HTML de coverage:
```bash
cd backend
npm run test:coverage
# Luego abrir: coverage/index.html
```

### Ejecutar tests en modo watch (durante desarrollo):
```bash
cd backend
npm test -- --watch
```

### Ver solo tests fallidos:
```bash
cd backend
npm test -- --onlyFailures
```

### Ejecutar con logs detallados:
```bash
cd backend
npm test -- --verbose
```

---

## 📝 Documentación Disponible

1. **README Principal:** `backend/README.md`
2. **README de Tests:** `backend/tests/README.md`
3. **Resumen de Cambios:** `RESUMEN_CAMBIOS.md`
4. **Esta Guía:** `GUIA_SUSTENTACION.md`

---

## ✅ Checklist Final

Antes de la sustentación, verificar:

- [ ] `npm test` pasa todos los tests (26/26)
- [ ] `npm run test:coverage` muestra >60% coverage
- [ ] Servidor arranca sin errores (`npm run dev`)
- [ ] Frontend funciona (opcional, no afecta métricas)
- [ ] Documentación completa y actualizada
- [ ] `.env` configurado correctamente
- [ ] `node_modules` instalado

---

**¡Listo para sustentar con éxito! 🎉**
