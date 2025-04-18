import CartServices from "../services/cart.services.js"

const addToCart = async(args) =>{
    try{
        const product_id = args.cmd[2]
        const quantity = parseInt(args['quantity'])
        const {userId} = args
        if(!userId){
            console.log("User Id is required.")
            return
        }
        const result = await CartServices.addToCart(product_id, quantity, userId)
        console.log(result)
    }catch(e){
        console.log(e.message)
    }
}

const viewCart = async(args) =>{
    try{
        const carts = await CartServices.viewCart(args)
        if(carts.length == 0){
            console.log("Cart is empty!!")
            return
        }
        console.log(carts)
    } catch(e){
        console.log(e.message)
    }
}

const removeCartItem = async(args) =>{
    try{
        const product_id = args.cmd[2]
        const {userId} = args
        if(!userId){
            console.log("User Id is required.")
            return
        }
        const result = await CartServices.removeCartItem(product_id, userId)
        console.log(result)
    } catch (e){
        console.log(e.message)
    }
}

const cartTotal = async(args) =>{
    try{
        const {userId} = args
        if(!userId){
            console.log("User Id is required.")
            return
        }
        const result = await CartServices.cartTotal(userId)
        console.log("Cart total:", result)
    } catch(e){
        console.log(e.message)
    }
}

const CartController = {
    addToCart,
    viewCart, 
    removeCartItem, cartTotal
}

export default CartController