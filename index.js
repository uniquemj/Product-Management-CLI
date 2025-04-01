import { parseArgv } from "./helper/utils.js";
import ProductRoute from "./routes/product.route.js";
import CartRoute from "./routes/cart.route.js";
import HelpRoute from "./routes/help.route.js";
import OrderRoute from "./routes/order.route.js";


const Command_Argument = parseArgv(process.argv.slice(2))

switch(Command_Argument.cmd[0]){
    case 'help':
        HelpRoute()
        break
    case 'product':
        ProductRoute(Command_Argument)
        break
    case 'cart':
        CartRoute(Command_Argument)
        break
    case 'order':
        OrderRoute(Command_Argument)
        break
    default:
        console.log(`${Command_Argument.cmd[0]} command doesn't exist.`)
}

