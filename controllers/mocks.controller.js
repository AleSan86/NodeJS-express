import { generateUser, generateProduct } from '../utils.js';

export class MocksController {

    async getMockedUsers(req, res) { 
        try {
            let users = [];
            let numUsuarios = 5
            for (let index = 0; index < numUsuarios; index++) {
                users.push(generateUser())
            }
            res.send({ status: "success", payload: users })
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: error, message: "Error al obtener los usuarios:" });
        }
    }

    async getMockedProducts(req, res) {
        try {
            let products = [];
            let numOfProducts = 50
            for (let index = 0; index < numOfProducts; index++) {
                products.push(generateProduct())
            }
            res.send({ status: "success", payload: products })
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: error, message: "Error al obtener los productos:" });
        }
    }
}
