# Backend Note Challenge

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.1-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)

Este es el backend para la aplicación de gestión de notas (Note Challenge). Está construido como una API RESTful utilizando Spring Boot y Java 21, con PostgreSQL como base de datos y Lombok para reducir el código repetitivo.

## 🚀 Características Principales

- **Autenticación de Usuario:** Endpoint simple de login que retorna un identificador de usuario único.
- **Gestión de Notas (CRUD):** Crear, listar, editar y eliminar notas de forma ágil.
- **Archivado de Notas:** Funcionalidad para archivar notas cuando ya no se usan y recuperarlas más tarde.
- **Gestión de Categorías:** Posibilidad de crear categorías y agrupar o clasificar las notas dentro de estas, para una mejor organización.

## 🛠️ Tecnologías Utilizadas

- **Java 21**
- **Spring Boot 4.0.1**
  - Spring Web MVC
  - Spring Data JPA
- **PostgreSQL**
- **Lombok**
- **Maven**

## 📋 Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalados los siguientes componentes:

1. [Java Development Kit (JDK) 21](https://jdk.java.net/21/)
2. [Apache Maven](https://maven.apache.org/download.cgi)
3. [PostgreSQL](https://www.postgresql.org/download/)

## ⚙️ Configuración y Ejecución

1. **Clonar el repositorio:** (o en este caso, ubicarse en la carpeta del proyecto)
   ```bash
   git clone <url-del-repositorio>
   cd backend
   ```

2. **Configurar la base de datos PostgreSQL:**
   Antes de arrancar el backend, necesitas tener lista tu base de datos local. Sigue estos pasos:
   
   * **Paso A: Crear la base de datos en PostgreSQL.** 
     Abre tu cliente de SQL favorito (como pgAdmin o el terminal de psql) y ejecuta el siguiente comando para generar la base de datos que usará esta API:
     ```sql
     CREATE DATABASE notesdb;
     ```
   
   * **Paso B: Configurar credenciales en Spring Boot.**
     Deberás modificar el archivo de propiedades en la ruta `src/main/resources/application.properties` para enlazar tu aplicación con la base de datos que acabas de crear. Ábrelo y asegúrate de que tenga contenido similar a este:
     ```properties
     spring.application.name=backend
     
     # URL de conexion indicando tu base local 'notesdb'
     spring.datasource.url=jdbc:postgresql://localhost:5432/notesdb
     
     # Reemplaza '' y '' por tus accesos reales de postgresql
     spring.datasource.username=
     spring.datasource.password=
     
     # (Importante) ddl-auto en 'update' permite que Spring Boot genere las
     # tablas de forma automatica basados en los Models del codigo
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
     ```
     *(Nota: Es de vital importancia eliminar cualquier tilde o letra eñe (ej. usar "Configuracion" en lugar de "Configuración") si incluyes comentarios, ya que Java los procesa en codificaciones que arrojan el error `MalformedInputException`).*

3. **Ejecutar el proyecto con Maven Wrapper:**
   ```bash
   ./mvnw spring-boot:run
   ```
   O en caso de usar Maven de tu sistema:
   ```bash
   mvn spring-boot:run
   ```

La API estará disponible localmente, usualmente en `http://localhost:8080`.

## 🔐 Autenticación

El sistema usa una capa de seguridad propietaria simple a nivel de sistema.
Al iniciar sesión desde el `POST /api/login`, el servidor verificará las credenciales y devolverá un Custom Header: `X-User-Id`. 

Todas las peticiones subsiguientes (notas, categorías) requerirán que envíes este header HTTP (`X-User-Id: <ID_DEL_USUARIO>`) en las solicitudes HTTP para identificar al usuario actual activo.

## 📚 Endpoints de la API

### Autenticación
- `POST /api/login` - Inicia sesión y retorna en los Headers el identificador `X-User-Id`. (Requiere enviar `username` y `password` en el body).

### Notas (`/api/notes`)
- `GET /api/notes` - Obtiene todas las notas activas (no archivadas) del usuario actual.
- `GET /api/notes/archived?archived={boolean}` - Obtiene todas las notas filtradas por su estado en la papelera/archivo.
- `POST /api/notes` - Crea una nota nueva.
- `PUT /api/notes/{id}` - Permite editar el contenido o detalles de la nota.
- `PATCH /api/notes/archived` - Archiva o desarchiva la nota basándose en el parámetro o cuerpo enviado.
- `DELETE /api/notes/{id}` - Elimina permanentemente una nota.

### Categorías (`/api/category`)
- `POST /api/category` - Crea una nueva categoría.
- `GET /api/category` - Obtiene la lista de categorías del usuario actual.
- `GET /api/category/{id}` - Obtiene las notas de una categoría específica por su ID.
- `PUT /api/category/add/{id}` - Agrega un bloque de notas a una categoría específica.
- `PUT /api/category/delete/{id}` - Desasocia un bloque de notas de cierta categoría.
- `PUT /api/category/{catId}/notes/{noteId}` - Agrega una nota específica a la categoría indicada.
- `DELETE /api/category/{catId}/notes/{noteId}` - Elimina la relación de la categoría indicada pero mantiene la nota existiendo de forma global.
- `DELETE /api/category/{id}` - Elimina definitivamente la categoría en cuestión.

## 🤝 Contribución

Fue hecho sobre todo para entender medianamente el framenwork y la verdad fue bastante interesante como tambien educativo, con la base correcta al final las cosas son bastante sencillas de implementar, lo que si me falto fue tiempo para poder implementar mas funcionalidades como por ejemplo la de poder subir archivos a las notas, etc. Pero en general fue una buena experiencia.
No se si creas necesario hacer alguna contribución, pero si es así, siéntete libre de hacerlo.
---
*Desarrollado para Note Challenge.*
