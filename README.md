TP FINAL COMISION-70150 - Coderhouse

Instalación y Ejecución

Descargar del Repositorio

Clonar el proyecto desde la rama main:

git clone -b main https://github.com/tuusuario/tp-final.git
cd tp-final

Instalar Dependencias

Ejecutar el siguiente comando para instalar todas las dependencias necesarias:

npm install

Correr el Proyecto

Para iniciar el proyecto en modo desarrollo, ejecutar:

npm run dev

Docker Hub

La imagen del proyecto está disponible en Docker Hub.

🔗 Link a Docker Hub: tf-comision70150

Para descargar y correr la imagen en un contenedor:

docker pull datach7482/tf-comision70150:latest
docker run -d --name tf-container -p 8080:3000 datach7482/tf-comision70150:latest

Testing de Rutas

Ejecución de Pruebas

Iniciar el servidor:

npm run dev

En otra terminal, ejecutar las pruebas:

npm run test

Rutas de Autenticación

POST /api/sessions/register → Registro de usuario

POST /api/sessions/login → Inicio de sesión

GET /api/sessions/current → Obtener sesión actual

POST /api/sessions/unprotectedLogin → Inicio de sesión sin protección

GET /api/sessions/unprotectedCurrent → Obtener sesión sin protección

POST /api/sessions/logout → Cerrar sesión

Documentación API

Endpoints de Mascotas

GET /api/pets/ → Obtener todas las mascotas

POST /api/pets/ → Crear una nueva mascota

POST /api/pets/withimage → Crear mascota con imagen (requiere archivo)

PUT /api/pets/:pid → Actualizar información de una mascota

DELETE /api/pets/:pid → Eliminar una mascota
