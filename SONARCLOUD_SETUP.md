# Configuración de SonarCloud para Inventarium

Este documento explica cómo está configurado SonarCloud para analizar el código y la cobertura de tests del proyecto Inventarium.

## 📋 Configuración Actual

### Archivos Configurados

1. **`sonar-project.properties`** - Configuración principal de SonarCloud
2. **`.github/workflows/sonarcloud.yml`** - Workflow de GitHub Actions
3. **`.gitignore`** - Excluye la carpeta `coverage/` del repositorio

### Configuración de Jest

El proyecto ya está configurado para generar reportes de cobertura en formato LCOV:

```json
"jest": {
  "coverageReporters": ["text", "html", "lcov", "text-summary"]
}
```

## 🚀 Configuración Inicial en SonarCloud

### Paso 1: Crear el Proyecto en SonarCloud

1. Ve a [SonarCloud](https://sonarcloud.io/)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en el botón **"+"** → **"Analyze new project"**
4. Selecciona la organización **`m4ll4`**
5. Selecciona el repositorio **`M4LL4/inventarium-JavaScript`**
6. Haz clic en **"Set Up"**

### Paso 2: Configurar el Token de SonarCloud

1. En SonarCloud, ve a **My Account** → **Security** → **Generate Tokens**
2. Crea un token con nombre `inventarium-github-actions`
3. Copia el token generado

### Paso 3: Agregar el Token a GitHub Secrets

1. Ve a tu repositorio en GitHub: `https://github.com/M4LL4/inventarium-JavaScript`
2. Ve a **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **"New repository secret"**
4. Nombre: `SONAR_TOKEN`
5. Valor: Pega el token copiado de SonarCloud
6. Haz clic en **"Add secret"**

## 🔄 Uso del Análisis Automático

### Análisis por GitHub Actions

El workflow se ejecuta automáticamente cuando:
- Haces **push** a las ramas `main` o `test`
- Creas o actualizas un **Pull Request**

El workflow realiza:
1. ✅ Checkout del código
2. ✅ Instalación de dependencias
3. ✅ Ejecución de tests con cobertura
4. ✅ Verificación del archivo `lcov.info`
5. ✅ Envío del análisis a SonarCloud

### Análisis Local con SonarScanner

Si prefieres ejecutar el análisis localmente:

#### Instalación de SonarScanner

**Windows (con Chocolatey):**
```bash
choco install sonarscanner
```

**macOS (con Homebrew):**
```bash
brew install sonar-scanner
```

**Linux o descarga manual:**
- Descarga desde: https://docs.sonarcloud.io/advanced-setup/ci-based-analysis/sonarscanner-cli/
- Descomprime y agrega al PATH

#### Ejecutar Análisis Local

```bash
# 1. Ve al directorio del proyecto
cd "c:\Users\j3rmo\OneDrive\Desktop\Calidad de Software\inventarium2"

# 2. Genera el reporte de cobertura
cd backend
npm test -- --coverage

# 3. Vuelve a la raíz y ejecuta sonar-scanner
cd ..
sonar-scanner -Dsonar.login=TU_TOKEN_AQUI
```

## 📊 Verificar la Cobertura en SonarCloud

### Después del Primer Análisis

1. Ve a [SonarCloud](https://sonarcloud.io/)
2. Abre tu proyecto: **`M4LL4_inventarium-JavaScript`**
3. En el **Dashboard principal** verás:
   - **Coverage**: Porcentaje de cobertura de código
   - **Lines to Cover**: Líneas totales cubiertas
   - **Uncovered Lines**: Líneas sin cubrir

### Verificar Métricas Detalladas

#### Vista de Resumen
- Ve a **Overview** en el menú lateral
- Busca el widget **"Coverage"**
- Debe mostrar un porcentaje (según tu archivo lcov.info, debería estar alrededor del 80%)

#### Vista de Archivos
1. Ve a **Code** → **Files**
2. Navega a `backend/` → `controllers/` → `productoController.js`
3. Verás las líneas coloreadas:
   - 🟢 **Verde**: Líneas cubiertas por tests
   - 🔴 **Rojo**: Líneas no cubiertas
   - 🟡 **Amarillo**: Líneas parcialmente cubiertas

#### Vista de Métricas
1. Ve a **Measures** en el menú lateral
2. Selecciona **"Coverage"** en el filtro
3. Verás:
   - **Overall Coverage**: Cobertura total
   - **Line Coverage**: Cobertura de líneas
   - **Branch Coverage**: Cobertura de ramas (condicionales)
   - **Conditions to Cover**: Condiciones totales

### Indicadores de Éxito

✅ **El análisis funciona correctamente si:**
- El dashboard muestra un porcentaje de **Coverage** mayor a 0%
- Puedes ver archivos individuales con líneas coloreadas
- La métrica de **Coverage** se actualiza después de cada push
- En el historial (Activity) aparecen los análisis de cada commit

❌ **Problemas comunes:**
- **Coverage: 0%** → Verifica que el archivo `lcov.info` se esté generando
- **No aparece Coverage** → Revisa la ruta en `sonar-project.properties`
- **Workflow falla** → Verifica que el `SONAR_TOKEN` esté configurado correctamente

## 🧪 Comandos Útiles

```bash
# Ejecutar tests con cobertura
cd backend
npm test

# Ver reporte de cobertura en HTML
# Abre: backend/coverage/index.html en el navegador

# Ejecutar solo el análisis de SonarCloud (después de generar cobertura)
sonar-scanner

# Ver el archivo lcov.info
cat backend/coverage/lcov.info
```

## 📁 Estructura de Archivos Relevantes

```
inventarium2/
├── sonar-project.properties          # Configuración de SonarCloud
├── .gitignore                        # Excluye coverage/
├── .github/
│   └── workflows/
│       └── sonarcloud.yml           # GitHub Actions workflow
└── backend/
    ├── package.json                  # Configuración de Jest
    ├── coverage/
    │   └── lcov.info                # Reporte generado por Jest
    ├── tests/                        # Tests de Jest
    ├── controllers/                  # Código a analizar
    ├── models/                       # Código a analizar
    └── routes/                       # Código a analizar
```

## 🔗 Enlaces Útiles

- **SonarCloud Dashboard**: https://sonarcloud.io/organizations/m4ll4/projects
- **Documentación de SonarCloud**: https://docs.sonarcloud.io/
- **GitHub Actions**: https://github.com/M4LL4/inventarium-JavaScript/actions
- **Jest Coverage**: https://jestjs.io/docs/configuration#coveragereporters-arraystring--string-options

## 📈 Cobertura Actual

Según el último reporte `lcov.info`:

- **app.js**: 94.1% líneas
- **config/database.js**: 83.3% líneas
- **controllers/productoController.js**: 70.4% líneas
- **controllers/usuarioController.js**: 67.4% líneas
- **middleware/authMiddleware.js**: 91.7% líneas
- **middleware/roleMiddleware.js**: 100% líneas
- **middleware/validateProducto.js**: 92.3% líneas
- **models/***: 100% líneas

## 🎯 Próximos Pasos

1. ✅ Hacer commit de los archivos de configuración
2. ✅ Hacer push a la rama `test` o `main`
3. ✅ Verificar que el workflow se ejecuta en GitHub Actions
4. ✅ Revisar el dashboard de SonarCloud
5. 🎯 Mejorar la cobertura en áreas con bajo porcentaje
