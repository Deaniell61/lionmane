# LionMane
El documento base de la prueba de encuentra adjunto en este repositorio.

El
propósito de esta aplicación será para explorar las diferentes razas de perros que nos
proveen un API.

Se utiliza el API que se indico para obtener la información de las
diferentes razas de perros. Se desarrollo la aplicación
utilizando Angular y Node con Typescript.

Para obtener la información de las razas y sub-razas de perros, se utilizo el siguiente
API: 
[https://dog.ceo/dog-api/documentation](https://dog.ceo/dog-api/documentation)

Este API categoriza los perros en razas (por ejemplo, Hound) y luego por sub-razas
(por ejemplo, Afghan Hound, English Foxhound, etc). Es importante preservar esta
jerarquía y mostrar las razas y sub-razas de perros estructuradamente..

## Instalación
La aplicacion esta encapsulada pasa ser usada con [docker-compose](https://docs.docker.com/compose/) por lo que es necesario tener instalada la ultima version de [Docker](https://www.docker.com/products/docker-desktop), asi como tambien [Node.js](https://nodejs.org/es/download/) para asegurarnos que los deployments se hagan de manera correcta.
### Prerequisitos

Qué cosas necesitas para instalar el software y cómo instalarlas

```
nodejs v => 8
```
```
docker v => latest
```
## Uso
Para poder probar la aplicacion es necesario clonar el repositorio y levantar los contenedores contenidos en el archivo [docker-compose.yml](https://docs.docker.com/compose/compose-file/)
```bash
> docker-compose up --build
```
Los archivos Dockerfile estan configurados para levantarse en orden de dependencia, en las siguiente rutas [Backend](http://localhost:8000), [Frontend](http://localhost:4200) y [Base de Datos](http://localhost:3306).

Para visualizar la aplicacion abra la direccion [http://localhost:4200](http://localhost:4200) en su navegador.

## Agradecimiento
De ante mano agradezco el interes en mi perfil, espero cumplir las espectativas del puesto.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Autores

* **Daniel Rodriguez** - *Trabajo inicial* - [Deaniell61](https://github.com/Deaniell61)
