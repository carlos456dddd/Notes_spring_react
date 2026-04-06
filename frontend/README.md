# Frontend - Aplicación de Notas (React)

Este es el frontend para la Aplicación de Notas, construido utilizando **React**. Este proyecto provee la interfaz visual para que el usuario interactúe con la API del backend.

## Prerrequisitos

Antes de iniciar este proyecto, asegúrate de tener instalado:
- **Node.js** (versión recomendada LTS)
- **npm** (usualmente se instala junto con Node.js)

## Instalación

1. Abre una terminal dentro de la carpeta `frontend`.
2. Instala todas las dependencias necesarias ejecutando el siguiente comando:

   ```bash
   npm install
   ```

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
