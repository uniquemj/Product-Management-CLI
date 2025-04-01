import ProductRepository from "../repository/product.repository.js";
import { getRandomId } from "../helper/utils.js";

const getAllProduct = async() =>{
    return await ProductRepository.findAll()
}

const createProduct = async(args) =>{
    const {name, price, description, category, inventory} = args
    
    if(!name || !price){
        return "Name and Price are required."
    }
        
    const productDetail = {
        p_id : getRandomId(),
        name: name,
        price: price,
        description: description || "",
        category:  category || "",
        inventory: parseInt(inventory) || 0
    }

    return await ProductRepository.create(productDetail)
}

const updateProduct = async(id, args) =>{
    const product = await ProductRepository.findById(id)
    if(!product){
        return "Product with Id not found"
    }

    const result = await ProductRepository.edit(id, args)
    return result
}

const removeProduct = async(id) =>{
    const product = await ProductRepository.findById(id)

    if(!product){
        return false
    }

    return await ProductRepository.remove(id)
}

const ProductServices = {
    getAllProduct,
    createProduct,
    updateProduct, 
    removeProduct
}

export default ProductServices