import UserDao from '../../DAO/clases/users.dao.js'
import mongoose from 'mongoose';
import Assert from 'assert';
//import { before, describe } from "node:test";

const assert = Assert.strict;

mongoose.connect(`mongodb+srv://AleSan86:ContraseñaSegura123@codere-commerce.4xgrna2.mongodb.net/coderMongoDb`)

describe('Testing Users Dao', () => {

    before(function () {
        this.userDao = new UserDao();
    })

    beforeEach(function () {
        mongoose.connection.collections.users.drop();
        this.timeout(6000)
    })

    //Test 1
    it('El dao debe devolver los usuarios en formato de arreglo', async function() {
        //Given
        console.log(this.userDao);
        const isArray = true;

        //Then
        const result = await this.userDao.getUser() // Se espera un Array []

        //Assert
        assert.strictEqual(Array.isArray(result), isArray)

    })

    //Test 2
    //it()

    afterEach(function () {
        mongoose.connection.collections.users.drop();
        this.timeout(6000)
    })


})

