import OrderServices from "../services/order.services.js";

const createOrder = async (args) =>{
    try{
        const {userId} = args
        const result = await OrderServices.createOrder(userId)
        console.log(result)
    } catch(e){
        console.log(e.message)
    }
}

const getOrderList = async (args) =>{
    try{
        const {userId} = args
        if(!userId){
            console.log("User Id is required.")
            return
        }
        const result = await OrderServices.getOrderList(userId)
        console.log(result)
    }catch(e){
        console.log(e.message)
    }
}

const updateStatus = async (args) =>{
    try{
        const orderId = args.cmd[2]
        const {userId, status} = args
        if(!userId || !status){
            console.log("User Id and status required")
            return
        }
        const result = await OrderServices.updateStatus(orderId, userId, status)
        console.log(result)
    } catch (e) {
        console.log(e.message)
    }
}

const OrderController = {
    createOrder,
    getOrderList,
    updateStatus
}

export default OrderController