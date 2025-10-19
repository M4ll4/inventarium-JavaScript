/**
 * README - Organización de Tests
 * 
 * Este directorio contiene tests organizados de forma modular para facilitar
 * la ejecución individual y la sustentación del proyecto.
 * 
 * ESTRUCTURA:
 * ============
 * 
 * 1. Tests de Integración:
 *    - productos.integration.test.js: Pruebas completas del módulo de productos
 *    - usuarios.integration.test.js: Pruebas completas del módulo de usuarios
 * 
 * 2. Helpers:
 *    - helpers.js: Funciones auxiliares reutilizables para tests
 * 
 * CÓMO EJECUTAR TESTS:
 * ====================
 * 
 * # Ejecutar TODOS los tests:
 * npm test
 * 
 * # Ejecutar solo tests de productos:
 * npm test -- productos.integration.test.js
 * 
 * # Ejecutar solo tests de usuarios:
 * npm test -- usuarios.integration.test.js
 * 
 * # Ver cobertura completa:
 * npm run test:coverage
 * 
 * # Ejecutar tests en modo watch (útil durante desarrollo):
 * npm test -- --watch
 * 
 * COBERTURA ACTUAL:
 * =================
 * - Statements: >83%
 * - Branches: >75%
 * - Functions: >83%
 * - Lines: >86%
 * 
 * NOTAS PARA SUSTENTACIÓN:
 * ========================
 * - Cada archivo de test es independiente y puede ejecutarse por separado
 * - Los tests siguen metodología TDD (Test-Driven Development)
 * - Se cubren casos exitosos, errores y validaciones de seguridad
 * - Todos los tests usan base de datos en memoria (SQLite) para aislamiento
 */
