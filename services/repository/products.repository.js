export default class ProductsRepository {

    constructor(dao) {
        this.dao = dao;
    }

    getAll = () =>{
        return this.dao.getAll();
    }

    getById = (id) => {
        return this.dao.getById(id);
    }

    getByCode = (params) => {
        return this.dao.getByCode(params);
    }

    createProduct = (product) =>{
        return this.dao.createOne(product);
    }

    updateProduct = (id, product) =>{
        return this.dao.updateProduct(id, product);
    }

    findByName = async (productname) => {
        return this.dao.findByName(productname);
    };

    deleteProduct = (id) => {
        return this.dao.deleteOne(id);
    }
};