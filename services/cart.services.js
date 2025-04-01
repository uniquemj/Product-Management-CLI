import ProductRepository from "../repository/product.repository.js"
import CartRepository from "../repository/cart.repository.js"

const addToCart = async (product_id, quantity, userId) =>{
    
    if(!quantity){
        return "Quantity is required"
    }
    const product = await ProductRepository.findById(product_id)
    if(!product){
        return "Product with Id doesn't exist."
    }

    const result = await CartRepository.add(product, quantity, userId)
    return result
}

const viewCart = async(args) =>{
    const {userId} = args
    if(!userId){
        return "User Id is required."
    }
    return await CartRepository.getAllCart(userId)
}

const removeCartItem = async(product_id, userId) =>{
    const cart_Items = await CartRepository.getAllCart(userId)
    const cart_Item = cart_Items[0].items.filter((t)=>t.product.p_id === product_id)
    if(cart_Item.length == 0){
        return 'Product with Id not found.'
    }

    const cartItem = await CartRepository.remove(cart_Item, userId)
    return cartItem
}

const cartTotal = async(userId) =>{
    return await CartRepository.total(userId)
}

const CartServices = {
    addToCart,
    viewCart,
    removeCartItem,
    cartTotal
}

export default CartServices