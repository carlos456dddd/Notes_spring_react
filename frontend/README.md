# Frontend - Aplicación de Notas (React)

Este es el frontend para la Aplicación de Notas, construido utilizando **React**. Este proyecto provee la interfaz visual para que el usuario interactúe con la API del backend.

## 📦 Versiones y Tecnologías Clave

Este proyecto utiliza las siguientes librerías principales (ver `package.json` para el listado completo):

*   **React:** `^19.2.3` - Core para la interfaz de componentes.
*   **React DOM:** `^19.2.3` - Gestión del DOM web.
*   **React Router DOM:** `^7.11.0` - Manejo de rutas y navegación dentro de la app (Navegación SPA).
*   **Axios:** `^1.13.2` - Cliente HTTP basado en promesas usado para conectarse a la API de Spring Boot.

## ⚙️ Prerrequisitos

Antes de iniciar este proyecto, asegúrate de tener instalado:
- **Node.js** (versión recomendada **v18 LTS** o superior)
- **npm** (usualmente se instala junto con Node.js)

## 🚀 Instalación y Preparación

Para tener todo el código descargado y listo para funcionar en tu máquina local:

1. Abre una terminal y colócate específicamente dentro de la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Ejecuta el comando de instalación de Node Package Manager (NPM). Esto leerá el archivo `package.json`, descargará todas las librerías mencionadas (React, Axios, etc.) de internet y creará una carpeta oculta `node_modules`.

   ```bash
   npm install
   ```
   *(Nota: Este paso puede demorar un par de minutos la primera vez dependiendo de tu conexión a internet).*

## Cómo ejecutar la aplicación

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm start
```

Esto abrirá la aplicación web en [http://localhost:3000](http://localhost:3000) automáticamente en tu navegador. 

La página se recargará automáticamente si haces modificaciones en el código y podrás ver cualquier error de sintaxis en la consola.

## Conexión con el Backend

Ten en cuenta que esta aplicación necesita que el servidor de **Backend (Spring Boot y PostgreSQL)** esté en ejecución para poder leer o estructurar la información (generalmente se ejecuta en `http://localhost:8080`).

Para levantar ambos de manera simultánea:
1. Mantén una terminal ejecutando `npm start` en la carpeta `frontend`.
2. Abre una **nueva** terminal, ve a la carpeta `backend` y ejecuta `.\mvnw spring-boot:run` (asegurándote primero de tener la base de datos configurada).

## Compilar para producción (Build)

Si en el futuro deseas compilar el código para pasarlo a producción, ejecuta:

```bash
npm run build
```

Esto procesará, agrupará y minificará todo el código de React en una carpeta llamada `build`, la cual estará lista para ser desplegada en un servidor.
