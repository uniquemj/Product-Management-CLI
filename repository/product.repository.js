import fs from 'fs/promises';

import path from 'path'
import { readFileHelper, writeFileHelper} from '../helper/utils.js';

export const productStorage = path.join(process.cwd(), 'data', 'products.json')

const findAll = async() =>{

    try{
        return await readFileHelper(productStorage)
    } catch (e) {
        await writeFileHelper(productStorage, [])
        return await readFileHelper(productStorage)
    }
}

const findById = async(id) =>{
    const products = await readFileHelper(productStorage)
    const product = products.find((product) => product.p_id == id)
    return product
}

const create = async(productDetail) =>{
    try{
        const products = await readFileHelper(productStorage)
        products.push(productDetail)
        await writeFileHelper(productStorage, products)
        return "Product Added."
    } catch (e){
        await writeFileHelper(productStorage, [productDetail])
        return "Product Added"
    }
}

const edit = async(id, args) =>{
    try{
        const {name, price, description, category, inventory} = args
        const products = await readFileHelper(productStorage)
        const productIndex = products.findIndex((p) => p.p_id == id)

        
        const productDetail = {
            name: name || products[productIndex].name,
            price: price || products[productIndex].price, 
            description: description ||products[productIndex].description, 
            category: category || products[productIndex].category,
            inventory: parseInt(inventory)+products[productIndex].inventory || products[productIndex].inventory
        }

        products[productIndex] = {...products[productIndex], ...productDetail}
        
        await writeFileHelper(productStorage, products)
        return products[productIndex]
    } catch (e){
        throw new Error("Product Update Failed")
    }
}

const remove = async(id) =>{
    try{
        const products = await readFileHelper(productStorage)
        const newProducts = products.filter((p)=>p.p_id!==id)
        await writeFileHelper(productStorage, newProducts)
        return true
    }catch(e){
        throw new Error("Product Delete Failed")
    }
}

const ProductRepository = {
    findAll,
    findById,
    create,
    edit, 
    remove,
}

export default ProductRepository