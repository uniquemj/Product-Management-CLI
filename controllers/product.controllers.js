import ProductServices from "../services/product.services.js"



const getAllProducts = async () =>{
    try{
        const result = await ProductServices.getAllProduct()
        if(result.length == 0){
            process.stderr.write("Error: Product List is Empty!")
        } else{
            console.log(result)
        }
    }catch(e){
        console.log(e.message)
    }
}

const createProduct = async(args) =>{
    try{
        const result = await ProductServices.createProduct(args)
        console.log(result)
    } catch (e){
        console.log(e.message)
    }
}

const updateProduct = async(args) =>{
    try{
        const id = args.cmd[2]
        const result = await ProductServices.updateProduct(id, args)
        console.log(result)
    } catch(e){
        console.log(e.message)
    }
}

const removeProduct = async(id) =>{
    try{
        const result = await ProductServices.removeProduct(id)
        if(!result){
            console.log("Product with Id doesn't exist.")
        } else {
            console.log("Product removed.")
        }
        
    } catch (e) {
        console.log(e.message)
    }
}

const ProductController = {
    getAllProducts, 
    createProduct, 
    updateProduct,
    removeProduct
}

export default ProductController