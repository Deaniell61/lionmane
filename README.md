# ExpressBaseline

ExpressBaseline para utilizar en la generación de microservicios.

## Empezando

Estas instrucciones le permitirán obtener una copia del proyecto en funcionamiento en su máquina local para fines de desarrollo y prueba. Consulte la implementación para obtener notas sobre cómo implementar el proyecto en un sistema en vivo.

### Prerequisitos

Qué cosas necesitas para instalar el software y cómo instalarlas

```
nodejs v => 8
```

### Instalación

Una serie de ejemplos paso a paso que indican que debe ejecutar un entorno de desarrollo

Instalar las dependencias

```
npm install
```

Renombrar el archivo .env.example a .env y modificar las variables de entorno locales

```
APP_NAME=ExpressBaseline
APP_HOST=localhost
APP_PORT=8080
APP_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=admin
DB_DATABASE=lionmane
LOGGER_DEBUG=true
```

Instalar las migraciones

```
cd server/database
../../node_modules/.bin/sequelize db:migrate
```

Correr el proyecto

```
npm start
```

Al iniciar debe de mostrar en consola

```
ExpressBaseline.info: Connecte to Database <3
ExpressBaseline.info: Server running at: http://127.0.0.1:8080
```

## Autores

* **Daniel Rodriguez** - *Trabajo inicial* - [Deaniell61](https://github.com/Deaniell61)
