# Guía de Sustentación - Inventarium

Esta guía es un resumen sencillo y directo para explicar el proyecto, las pruebas y el enfoque de desarrollo. Úsala como guión para la sustentación.

---

## ¿Qué es Inventarium?

Inventarium es un sistema de gestión de inventarios con control de usuarios y roles, desarrollado en JavaScript usando Node.js (backend) y React (frontend). El backend expone una API REST segura y el frontend permite interactuar con ella de forma sencilla.

---

## ¿Qué se hizo en el backend?
- Se implementó una API REST modular con Express y Sequelize.
- Se crearon modelos para usuarios y productos.
- Se agregó autenticación con JWT y control de roles (admin, empleado, usuario).
- Se validan datos y reglas de negocio (ej: no se pueden crear productos con cantidad o precio negativos).
- Se protegieron rutas sensibles y se maneja cualquier error de forma centralizada.
- Se documentó todo y se automatizó la verificación del entorno para facilitar la vida al equipo.

---

## ¿Cómo se aplicó TDD?
- Antes de escribir cada funcionalidad, primero se escribió un test que fallaba.
- Luego se implementó el código mínimo para que ese test pasara.
- Finalmente, se refactorizó el código manteniendo siempre los tests en verde.
- Así, cada parte del sistema está cubierta por pruebas desde el inicio y se garantiza que todo funciona como se espera.

---

## ¿Qué prueban los tests?
- Los tests cubren los casos más importantes del sistema:
  - Registro y login de usuarios, incluyendo validaciones (ej: emails únicos, máximo 3 admins).
  - CRUD completo de productos, con validaciones de negocio y seguridad.
  - Que solo los roles correctos pueden modificar productos.
  - Que los errores y casos límite (ej: producto no encontrado, token inválido) se manejan correctamente.
- Todos los tests son de integración: simulan peticiones reales a la API y verifican la respuesta.
- Se usa una base de datos en memoria para que los tests sean rápidos y no afecten datos reales.

---

## ¿Por qué es importante este enfoque?
- El TDD asegura que el código es confiable y fácil de mantener.
- Las pruebas automatizadas permiten detectar errores rápido y facilitan los cambios futuros.
- La documentación y los scripts de verificación ayudan a que cualquier persona pueda levantar el proyecto sin problemas.

---

## ¿Cómo mostrar esto en la sustentación?
1. Explica brevemente qué hace el sistema y su arquitectura.
2. Muestra cómo se ejecutan los tests y que todos pasan.
3. Enseña un ejemplo de validación o error capturado por los tests.
4. Resalta que todo el desarrollo fue guiado por pruebas (TDD).
5. Si hay tiempo, muestra cómo cambiar una regla y cómo un test lo detecta.

---

**En resumen:**
- El sistema es seguro, probado y fácil de mantener.
- Todo está automatizado y documentado.
- El enfoque TDD garantiza calidad y confianza en el código.
