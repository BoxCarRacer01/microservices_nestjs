# Proyecto de Microservicios: Productos y Órdenes

Este proyecto consta de dos microservicios independientes: Productos y Órdenes, diseñados bajo el concepto de microservicios. Ambos microservicios están desarrollados con NestJS y se comunican entre sí utilizando el protocolo TCP.


### Microservicios

##### 1 - Productos:

Gestiona la información relacionada con los productos disponibles en el sistema.  Permite realizar las siguientes acciones:

   - Creación de los productos.
   - Listar todos los productos.
   - Consultar el detalle de un producto por su id.
   - Actualizar el stock de un producto.

    Puerto HTTP: 3002 y para TCP: 3003

##### 1 - Ordenes:

Se encarga de manejar las órdenes de compra o pedidos realizados. Permite:
   - Creación de listado de ordenes.
   - Listar todas las ordenes.
   - Obtener una orden por su id.
   - Validación de stock con el microservicio de productos.

    Puerto HTTP: 3000 y para TCP: 3001

### Características del Proyecto

-  **Base de datos**: Ambos microservicios usan una única base de datos en MYSQL
-  **Comunicación**: TCP entre ambos microservicios
-  **Dockerización**: 
        
    - Cada microservicio está dockerizado.
    - La base de datos MySQL no está dockerizada y se ejecuta localmente o en un servidor independiente.
    
### Arquitectura

El proyecto sigue los principios de Arquitectura Limpia, con una clara separación de responsabilidades y una estructura modular que facilita la mantenibilidad y escalabilidad.

#### Estructura del Proyecto:

 - 1_presentation:
    
    Esta capa contiene los controladores y rutas, es la encargada de recibir la información externa

 - 2_application:
    
    Esta capa contiene toda la lógica de negocio y casos de uso

 - 3_infraestructure:
    
    Aquí contiene las implementaciones específicas de tecnología como repositorios, integraciones con bases de datos y otros servicios externos.

 - 4_core:
    
    Entidades de la lógica del negocio

 - 5_common:
    
    Utilidades y clases comunes que pueden ser utilizadas en diversas partes del sistema, como constantes, excepciones y validaciones.

#### Ejecución del proyecto:

##### Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- Node.js: Se recomienda al menos la v20. 
- MySQL: Aunque los microservicios están dockerizados, el servidor de MySQL debe estar ejecutándose de forma independiente.
- Docker: (Opcional) si se requiere ejecutar en docker
 
Pasos para ejecutar el proyecto: 

- npm install  (Para ejecutar dependencias)
- Migrar la base de datos con  **TYPEORM** con el siguiente comando:
    
    - npm run migration:run
    - Si no hay migraciones disponibles, se pueden crear con el siguiente comando:
        
        - npm run migration:generate --name ejemplo_migracion
        - Y luego se puede migrar con el comando "npm run migration:run"
- Actualizar las credenciales de mysql en ***environment/environment.ts***

- Se puede probar la ejecución con el comando "npm run start:dev"

- Si se desea levantar la imagen docker, en la ruta del docker-compose.yml, ejecutar el comando: 

  -  docker-compose up --build -d

- Ya todo esta configurado para su correcta comunicación. 
- En la raíz del proyecto, se encuentra el postman por si se desea exportar y probar.

