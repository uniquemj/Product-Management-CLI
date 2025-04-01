import path from 'path'
import { getRandomId, readFileHelper, writeFileHelper } from '../helper/utils.js'
import { productStorage }from './product.repository.js'
import ProductRepository from './product.repository.js'

export const cartStorage = path.join(process.cwd(), 'data', 'carts.json')

const getAllCart = async(userId) =>{
    try{
        const carts = await readFileHelper(cartStorage)
        const cartItems = carts.filter((cart_item)=>cart_item.userId == userId)

        if(cartItems.length == 0){
            return `Cart for userId: ${userId} doesn't exist`
        }

        return cartItems
    }catch(e){
        await writeFileHelper(cartStorage, [])
        throw new Error("Error: Cart Item Fetch Failed.")
    }
}

const add = async(item, quantity, userId) =>{
    // fetching the product value from Product storage
    const products = await ProductRepository.findAll()
    const productIndex = await products.findIndex((p)=>p.p_id == item.p_id)

    // Defining Cart Item
    const cartItemInfo = {
        c_id: getRandomId(),
        userId: userId,
        items: [
            {product:products[productIndex], quantity: parseInt(quantity)}
        ]
    }

    try{
        const carts = await readFileHelper(cartStorage)

        // get cart Items for userId
        // this will return cart with userId
        const cartItems = carts.find((c_item)=>c_item.userId == userId)

        // search for item if present or not?
        const user_cart_items = cartItems.items.filter((c_item)=>c_item.product.p_id == item.p_id)

        // checks if user contain same product or not.
        if(user_cart_items.length == 0){  
            // when cart with userId doesn't contain same product
            cartItems.items.push({product:products[productIndex], quantity: parseInt(quantity)})
        } else {
            // when cart with userId contain same product
            const cartItemIndex = cartItems.items.findIndex((t) => t.product.p_id == item.p_id)

            if(item.inventory <= cartItems.items[cartItemIndex].quantity){
                return 'Product quantity limit.'
            }

            cartItems.items[cartItemIndex].product = products[productIndex]
            cartItems.items[cartItemIndex].quantity += quantity
        }

        await writeFileHelper(cartStorage, carts)
        return 'Product Added to Cart'
        
    } catch(e){
        await writeFileHelper(cartStorage, [cartItemInfo])
        return 'Product Added to Cart'
    }
}

const remove = async(item, userId) =>{
    try{
        const carts = await readFileHelper(cartStorage)
        // get cart Items for userId
        // this will return cart with userId
        const cartItems = carts.find((c_item)=>c_item.userId == userId)

        const cartItemsIndex = carts.findIndex((c_item)=>c_item.userId == userId)


        // search for item if present or not?
        const user_cart_items = cartItems.items.filter((c_item)=>c_item.product.p_id !== item[0].product.p_id)
        
        const newCartItems = user_cart_items
        cartItems['items'] = newCartItems
        carts[cartItemsIndex] = cartItems
        await writeFileHelper(cartStorage, carts)
        return 'Cart Item Removed.'
    }catch(e){
        throw new Error("Error: Cart Item Delete Fail.")
    }
}

const total = async(userId) =>{
    try{
        const carts = await readFileHelper(cartStorage)
        const user_cart_items = carts.filter((c_item)=> c_item.userId == userId)

        const total = user_cart_items[0].items.reduce((acc, current)=>{
            acc+= (parseInt(current.product.price) * current.quantity)
            return acc
        }, 0)
        return total
    } catch (e){
        throw new Error("Error: Cart total Failed.")
    }
}
const CartRepository = {
    add,
    getAllCart,
    remove,
    total
}

export default CartRepository