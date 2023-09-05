//----------------__DIRNAME------------------------------
import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//----------------bcrypt------------------------------
import bcrypt from 'bcrypt';
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashpassword) => bcrypt.compareSync(password, hashpassword);

//----------------Mock------------------------------
import { faker } from '@faker-js/faker';

export const generateUser = () => {
    let numOfProducts = parseInt(faker.string.numeric());
    let products = [];
    for (let i = 0; i < numOfProducts; i++) {
        let data = {
            product:generateProduct(),
            quantity:parseInt(faker.string.numeric())
        }
        products.push(data);
    }
    return { 
        firtsName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        age: 20,
        password: faker.internet.password(),
        rol:'User',
        cart: products,
        id: faker.database.mongodbObjectId(),
    };
};

export const generateProduct = () => {
    return {
        title: faker.commerce.product(),
        description:faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: parseInt(faker.string.numeric(2)),
        code:faker.string.numeric(5),
        thumbnail: faker.image.urlPicsumPhotos(),
        id: faker.database.mongodbObjectId()
    }
};

//module.exports= {generateUser,generateProduct}

//----------------MULTER------------------------------
// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'public'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// export const uploader = multer({
//   storage,
// });