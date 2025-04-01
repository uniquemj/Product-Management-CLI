import OrderRepository from "../repository/order.repository.js";

const createOrder = async(user_id) =>{
    const user_order = await OrderRepository.getOrderList(user_id)
    if(!user_order.length == 0){
        return "Order with user exist."
    }
    return await OrderRepository.createOrder(user_id)
}

const getOrderList = async(user_id) =>{
    return await OrderRepository.getOrderList(user_id)
}

const updateStatus = async(orderId, userId, status) =>{
    const user_order = await OrderRepository.getOrderList(userId)
    
    if(user_order[0].o_id !== orderId){
        return "Order with Order Id not found."
    }

    return await OrderRepository.updateStatus(orderId, userId, status)
}

const OrderServices = {
    createOrder, 
    getOrderList, 
    updateStatus
}

export default OrderServices