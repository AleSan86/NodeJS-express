import UserServiceDao from "../../DAO/clases/users.dao.js";
import ProductServiceDao from "../../DAO/clases/products.dao.js"
import CartServiceDao from "../../DAO/clases/carts.dao.js"

import UserRepository from "./users.repository.js";
import ProductRepository from "./products.repository.js"
import CartRepository from "./carts.repository.js"

const userDao = new UserServiceDao();
const productDao = new ProductServiceDao();
const cartDao = new CartServiceDao();

export const userService = new UserRepository(userDao);
export const productService = new ProductRepository(productDao);
export const cartService = new CartRepository(cartDao);
