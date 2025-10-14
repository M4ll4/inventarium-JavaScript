# Documentación de Cambios# Documentación de Cambios



## TDD Validaciones → Cobertura Jest## TDD Validaciones → Cobertura Jest



### 1. TDD de Validaciones Negativas### 1. TDD de Validaciones Negativas

- Se agregaron tests en `backend/tests/productos.test.js` para validar que no se puedan crear productos con cantidad o precio negativos.- Se agregaron tests en `backend/tests/productos.test.js` para validar que no se puedan crear productos con cantidad o precio negativos.

- Se implementó lógica mínima en el controlador (`backend/controllers/productoController.js`) para que los tests de negativos pasaran, devolviendo error 400 si los valores eran menores a cero.- Se implementó lógica mínima en el controlador (`backend/controllers/productoController.js`) para que los tests de negativos pasaran, devolviendo error 400 si los valores eran menores a cero.



### 2. Refactorización y Organización de Tests### 2. Refactorización y Organización de Tests

- Se revirtió el modelo `backend/models/Producto.js` a su estado original, eliminando validaciones custom y dejando solo las definiciones básicas de Sequelize.- Se revirtió el modelo `backend/models/Producto.js` a su estado original, eliminando validaciones custom y dejando solo las definiciones básicas de Sequelize.

- Se revirtió el controlador `backend/controllers/productoController.js` para quitar el manejo específico de errores de Sequelize y dejar un catch genérico.- Se revirtió el controlador `backend/controllers/productoController.js` para quitar el manejo específico de errores de Sequelize y dejar un catch genérico.

- Se reorganizó `backend/tests/productos.test.js`:- Se reorganizó `backend/tests/productos.test.js`:

  - Pruebas CRUD originales al inicio.  - Pruebas CRUD originales al inicio.

  - Pruebas de validación negativa debajo.  - Pruebas de validación negativa debajo.

  - Pruebas de campos requeridos y errores (404, 401) al final.  - Pruebas de campos requeridos y errores (404, 401) al final.

  - Se agregó un bloque `afterAll` para limpiar la base de datos.  - Se agregó un bloque `afterAll` para limpiar la base de datos.

- Se creó `backend/tests/helpers.js` para centralizar la creación de tokens y productos en los tests, reduciendo duplicación.- Se creó `backend/tests/helpers.js` para centralizar la creación de tokens y productos en los tests, reduciendo duplicación.



### 3. Middleware y Validaciones### 3. Middleware y Validaciones

- Se creó `backend/middleware/validateProducto.js` usando Joi para validar los datos de producto en las rutas POST y PUT.- Se creó `backend/middleware/validateProducto.js` usando Joi para validar los datos de producto en las rutas POST y PUT.

- Se integró el middleware de validación en las rutas de producto (`backend/routes/productoRoutes.js`).- Se integró el middleware de validación en las rutas de producto (`backend/routes/productoRoutes.js`).

- Se creó `backend/middleware/errorHandler.js` para manejar errores globalmente y devolver siempre `{ mensaje }` como respuesta.- Se creó `backend/middleware/errorHandler.js` para manejar errores globalmente y devolver siempre `{ mensaje }` como respuesta.

- Se integró el error handler en `backend/app.js`.- Se integró el error handler en `backend/app.js`.



### 4. Pruebas de Seguridad y Errores### 4. Pruebas de Seguridad y Errores

- Se agregaron tests para verificar que las rutas POST, PUT y DELETE requieren token y rol adecuado.- Se agregaron tests para verificar que las rutas POST, PUT y DELETE requieren token y rol adecuado.

- Se agregaron tests para casos de producto inexistente (GET, PUT, DELETE deben responder 404).- Se agregaron tests para casos de producto inexistente (GET, PUT, DELETE deben responder 404).

- Se ajustó el formato de error en todos los tests para esperar `{ mensaje }`.- Se ajustó el formato de error en todos los tests para esperar `{ mensaje }`.



### 5. Cobertura y CI### 5. Cobertura y CI

- Se configuró Jest en `backend/package.json` para activar cobertura, generar reporte HTML y establecer umbrales mínimos (80%).- Se configuró Jest en `backend/package.json` para activar cobertura, generar reporte HTML y establecer umbrales mínimos (80%).

- Se ejecutó `npm run test -- --coverage` para validar cobertura y detectar fallos.- Se ejecutó `npm run test -- --coverage` para validar cobertura y detectar fallos.

- Se detectaron dos tests fallidos (PUT producto: recibe 400 en vez de 200/404).- Se detectaron dos tests fallidos (PUT producto: recibe 400 en vez de 200/404).



------



Este documento resume todos los cambios implementados desde el inicio del TDD de validaciones negativas hasta la configuración de cobertura con Jest.Este documento resume todos los cambios implementados desde el inicio del TDD de validaciones negativas hasta la configuración de cobertura con Jest.
