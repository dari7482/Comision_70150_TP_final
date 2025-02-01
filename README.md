# TP FINAL COMISION-70150 Coder

## Instalación y ejecución

1. Clonar el repositorio y asegurarse de estar en la branch `main`.
2. Instalar las dependencias con:

   ```sh
   npm install
  # TP FINAL COMISION-70150 Coder

## Instalación y ejecución

1. Clonar el repositorio y asegurarse de estar en la branch `main`.
2. Instalar las dependencias con:

   ```sh
   npm install

Docker Hub
La imagen del proyecto está disponible en Docker Hub:

### https://hub.docker.com/repository/docker/datach7482/tf-comision70150/general

### Datos de la imagen:
### Repositorio: datach7482/tf-comision70150
### Tag: latest
### IMAGE ID: 05f34aa3c3dc
### Tamaño: 1.2GB

### Testing de rutas
### npm run dev
### npm run test

## Rutas de autenticación:
### POST /api/sessions/register → Registrar usuario
### POST /api/sessions/login → Iniciar sesión
### GET /api/sessions/current → Obtener información del usuario autenticado
### POST /api/sessions/unprotectedLogin → Login sin protección
### GET /api/sessions/unprotectedCurrent → Obtener usuario sin protección
### POST /api/sessions/logout → Cerrar sesión

### Documentación API

### Endpoints de Mascotas:
### GET /api/pets/ → Obtener todas las mascotas
### POST /api/pets/ → Crear una nueva mascota
### POST /api/pets/withimage → Crear una mascota con imagen
### PUT /api/pets/:pid → Actualizar una mascota por ID
### DELETE /api/pets/:pid → Eliminar una mascota por ID


