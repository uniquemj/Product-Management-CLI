import path from 'path'
import { readFileHelper, writeFileHelper, getRandomId } from '../helper/utils.js'
import CartRepository from './cart.repository.js'
import { cartStorage } from './cart.repository.js'
import ProductRepository, { productStorage } from './product.repository.js'

export const orderStorage = path.join(process.cwd(), 'data', 'orders.json')

const getOrderList = async(user_id) =>{
    try{
        const orders = await readFileHelper(orderStorage)
        const orderList = orders.filter((order)=>order.userId == user_id)

        if(!orderList){
            return 'Order with user id not found.'
        }
        return orderList
    }catch(e){
        await writeFileHelper(orderStorage, [])
        throw new Error("Error: Cart Item Fetch Failed.")
    }
}

const createOrder = async(user_id) =>{
    const userCart = await CartRepository.getAllCart(user_id)
    const products = await ProductRepository.findAll()
    const userCartItems = userCart[0].items

    // this code handles updating inventory for product
    const updateProducts = userCartItems.map((item)=>{
        const productIndex = products.findIndex((p_item) =>p_item.p_id ==item.product.p_id)
        products[productIndex].inventory -= item.quantity
        return item
    })
    await writeFileHelper(productStorage, products)

    //this code handles updating cart info with latest product inventory info
    const updateCarts = userCartItems.map((item)=>{
        const productIndex = products.findIndex((p_item)=>p_item.p_id ==item.product.p_id)
        item.product = products[productIndex]
        return item
    })

    const orderItems = {
        o_id: getRandomId(),
        userId:user_id,
        total: await CartRepository.total(user_id),
        timestamp: new Date(),
        status: "Pending",
        items: updateCarts,
    }
    try{
        const orders = await readFileHelper(orderStorage)
        orders.push(orderItems)
        await writeFileHelper(orderStorage, orders)
        await writeFileHelper(cartStorage, [])
        return 'Order Created.'
    } catch(e){
        await writeFileHelper(orderStorage, [orderItems])
        await writeFileHelper(cartStorage, [])
        return "Order Created."
    }
}

const updateStatus = async(orderId, userId, status) =>{
    try{
        const orders = await readFileHelper(orderStorage)
        const orderIndex = orders.findIndex((item) => item.orderId == orderId)
        const userOrder = orders.filter((item) => item.userId ==userId)
        userOrder['status'] = status
        orders[orderIndex] = userOrder[0]
        await writeFileHelper(orderStorage, orders)
        return "Status Updated"
    } catch (e) {
        throw new Error("Status Update Failed.")
    }
}

const OrderRepository = {
    createOrder,
    getOrderList,
    updateStatus
}

export default OrderRepository