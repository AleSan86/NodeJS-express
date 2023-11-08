import chai from "chai";
import supertest from "supertest";


const expect = chai.expect;
const requester = supertest('http://localhost:8080')

describe('Testing E-Commerce', () => {

    // describe api/products
    describe('Testing Products Api', () => {

        //Test 1
        it("Crear Producto: Debe crear un nuevo producto", async () => {
            //Given
            const productMock = {
                title: 'Paraguas',
                description: "Hecho con material de lona resistente",
                price: 20.000,
                thumbnail: "Sin imagen",
                code: "987poi",
                stock: 50,
                status: true,
                category: "Articulos"
            }

            //Then
            const { statusCode, ok, _body } = await requester.post('/api/products').send(productMock)

            //Assert
            expect(statusCode).to.be.equal(200)
            expect(_body.payload).is.ok.and.to.have.property('_id')

        })
    })

    
    // describe api/users
    describe('Testing Users Api', () => {

        //Test 1
        it("Test getAll usuarios: Debe poder buscar y obtener exitosamente a los usuarios de la BD", async () => {

            //Then
            const { statusCode, ok, _body } = await requester.get('/api/users').send()

            //Assert
            expect(statusCode).to.be.equal(200)
            // console.log(_body);
            // console.log(ok);

        })
    })

    describe('Testing auth Api', () => {

        //Test 2
        it("Test Registrar usuario: Debe poder registrar exitosamente un usuario", async () => {

            const mockUser = {
                firstName: "PepitoUser1",
                lastName: "BananaUser1",
                email: "junior_222@gmail.com",
                password: "123456"
            }

            //Given
            //mockUser

            //Then
            const { statusCode, ok, _body } = await requester.post('/register').send(mockUser);

            //Assert
            expect(statusCode).is.equal(201);
            expect(_body.payload).to.be.ok;
        })
    })  

    // describe api/users
    // describe('Testing login and session with Cookies:', () => {
        
    //     before(function(){
    //         this.cookie;
    //         this.mockUser = {
    //             firstName: "Junior",
    //             lastName: "Sandrin",
    //             email: "juniorLoco_22@gmail.com",
    //             password: "123456"
    //         }
    //     })

    //     //Test 1
    //     it("Test Register User: Debe poder registrar exitosamente un usuario", async function() {

    //         //Given

    //         //Then
    //        const { statusCode, ok, _body } = await requester.post('auth/register')
    //        .send(this.mockUser)

    //        //Assert
    //        expect(statusCode).is.equal(200)

    //     })

    //     //Test 2
    //     it("Test Login User: Debe poder loguear exitosamente un usuario que se encuentre" +
    //     "previamente resgitrado", async function() {

    //         //Given
    //         const mockLogin = {
    //             email: this.mockUser.email,
    //             password: this.mockUser.password
    //         }

    //         //Then
    //        const result = await requester.post('auth/login').send(this.mockLogin)
    //        console.log(result);
    //        const cookieResult = result.headers['set-cookie'][0]
    //        console.log(cookieResult);

    //        //Assert
    //        expect(result.statusCode).is.equal(200)

    //        const cookieData = cookieResult.split('=')
    //        this.cookie = {
    //         name: cookieData[0],
    //         value: cookieData[1]
    //        }

    //        expect(this.cookie.name).to.be.ok.and.equal('coderCookie')
    //        expect(this.cookie.value).to.be.ok

    //     })

    //     //Test 3
    //     it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y " +
    //     "desestructurarlo correctamente ", async function() {

    //         //Given
    //         const mockLogin = {
    //             email: this.mockUser.email,
    //             password: this.mockUser.password
    //         }

    //         //Then
    //        const { _body } = await requester.post('api/sessions/current')
    //        .set('Cookie', [`${this.cookie.name}=${this.cookie.value}`])
    //        console.log(_body);

    //        //Assert
    //        expect(_body.payload.email).to.be.ok.and.equal(this.mockUser.email)


    //     })

    // })

})