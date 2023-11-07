# NodeJS-express
CRUD de productos y carrito de compra en NodeJs y express para el curso de BackEnd de CoderHouse.
Este proyecto solo cuenta con las vistas de Login, Resgister, Error y Profile.
Las peticiones se realizan a través de POSTMAN (anexados al proyecto).

- [Instalación](#Instalación)
- [Uso](#Uso)
- [Extras](#extras)

## Instalación
```
npm install express
```

### Otras librerias destacadas:
mongoose -- mongoose-paginate-v2 -- nodemailer -- handlebars -- bcrypt

## Extras
<table>
    <th>Logger</th>
    <th>Nombre / v.</th>
    <th>URL - Implementación</th>
    <tr>
        <td rowspan="1">Swagger</td>
        <td>swagger-jsdoc / swagger-ui-express</td>
        <td>http://localhost:8080/apidocs/</td>
    </tr>
    <tr>
        <td rowspan="1">Winston</td>
        <td>^3.10.0</td>
        <td>embebido en código</td>
    </tr>
</table>

<table>
<tr>
    <th>Testing</th>
    <th>Versión instalada</th>
    <th>URL - Implementación</th>
    <tr>
	<td rowspan="1">Supertest</td>
        <td>chai: ^4.3.10 / mocha: ^10.2.0 / supertest: ^6.3.3</td>
        <td>http://localhost:8080/apidocs/</td>
    </tr>
    <tr>
        <td rowspan="1">Mock</td>
        <td>@faker-js/faker: ^8.0.2</td>
        <td>http://localhost:8080/api/mock/users</td>
    </tr>
</table>

## Uso
- npm run start
- npm run test
- npm run supertest
- http://localhost:8080/apidocs/
- http://localhost:8080/api/mock/users


