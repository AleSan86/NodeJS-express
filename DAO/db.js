import { connect } from 'mongoose';
import { UserModel } from './models/users.model.js';
import { ProductModel } from './models/products.model.js';
import { CartModel } from './models/carts.model.js';

export async function connectMongo() {
    try {
      await connect(`mongodb+srv://AleSan86:ContraseñaSegura123@codere-commerce.4xgrna2.mongodb.net/coderMongoDb`);
      console.log('Conectado a Mongo Atlas');

      let usuarios = await UserModel.paginate({limit:5,page:1})
      let productos = await ProductModel.paginate({limit:5,page:1})
      let carritos = await CartModel.paginate({limit:5,page:1})
      console.log(usuarios, productos, carritos);

      const response = {
        status: "success" | "error",
        payload: [{}],
        limit: Number,
        totalPages: Number,
        page: Number,
        pagingCounter: Number,
        hasPrevPage: Boolean,
        hasNextPage: Boolean,
        prevPage: null,
        nextPage: null,
        prevLink: String,
        nextLink: String,
      };
      
      // console.log(response)

      //---------------Función para agregar los usuarios a la db------------------

      //Descomentar para carga inicial de usuarios a la db, luego volver a comentar
      // (async () => {
      //     try {
      //       await UserModel.insertMany(users);
      //       console.log('Creados', users.length, 'usuarios');
      //     } catch (error) {
      //       console.error('Error creando los usuarios:', error);
      //     }
      //   })();

      //---------------Función para agregar los productos a la db------------------

      //Descomentar para carga inicial de productos a la db, luego volver a comentar
      // (async () => {
      //     try {
      //       await ProductModel.insertMany(products);
      //       console.log('Creados', products.length, 'productos');
      //     } catch (error) {
      //       console.error('Error creando los productos:', error);
      //     }
      //   })();

      //---------------Función para crear carts en la db------------------

      // (async () => {
      //     try {
      //       await CartModel.insertMany(carts);
      //       console.log('Creados', carts.length, 'carrillos');
      //     } catch (error) {
      //       console.error('Error creando los carrillos:', error);
      //     }
      //   })();

    } catch (e) {
        console.log(e);
        throw 'No se pudo conectar a Mongo Atlas';
    }
}

//Array de usuarios
let users= [
  {"firstName":"Natalia","lastName":"Moreira","email":"naty123@boston.com","age":35,"password":"123"},
  {"firstName":"Junior","lastName":"Moreira","email":"jrkpo_666@boston.com","age":12,"password":"1234"},
  {"firstName":"Ikki","lastName":"Moreira","email":"ikkyMarica@boston.com","age":14,"password":"12345"},
  {"firstName":"Ezio","lastName":"Moreira","email":"bebezio_22@boston.com","age":10,"password":"123456"},
]

//Array de productos
let products= [
  {"name":"Vino","marca":"Alaris","description":"Malbec joven","price":2500},
  {"name":"TV","marca":"Samsung","description":"40 pulgadas","price":52500},
  {"name":"Mochila","marca":"SOM","description":"Tela resistente","price":10200},
  {"name":"Libro de tejido","marca":"Tejido Amigurumis","description":"Número único - Anuario","price":5000},
  {"name":"Jabón en polvo","marca":"Ala","description":"Paquete de 1Kg.","price":1850}
]

//Array de carts
let carts= [
  {},
  {},
  {}
]