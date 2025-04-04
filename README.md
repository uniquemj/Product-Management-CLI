# Product Management CLI
This project implements the CLI for product, cart and order management.

## Project Overview
1. **Product Management**
   -    Product model with fields: id, name, price, description, category, inventory
   - Product CRUD operations
   - Input Validation
   - CLI commands for product management

2. **Cart Management**
    - Cart Model with items array
    - Cart operations: add, remove, update, view, calculate total
    - CLI commands for cart management

3. **Order Management**
    - Order model with: id, userId, items, total, timestamp, status
    - Order operations: create list, update status
    - CLI commands for order management


## CLI Commands
Below I have mentioned the working CLI commands and their use cases.

### Products
- **List all products**: It will list out all the products present in products.json.

```bash
node index.js product list
```

- **Add a new product**: It will add new product and append in products.json file.

```bash
node index.js product add --name="Laptop" --price=999.99
```
- **Update a product**: It will search for product in json file and update that record and update products.json file.
```bash
node index.js product update <productId> --inventory=10
```

- **Delete a product**: It will remove product with give id by filtering out products that don't match id provided and update json file.
```bash
node index.js product delete <productId>
```

### Cart
- **Add product to cart**: It takes 3 additional values i.e. product Id and user Id and quantity.

```bash
node index.js cart add <productId> --quantity=2 --userId=<userId>
```

- **Remove product from cart**: It takes userId along with product Id and remove product from item array in cart.
```bash
node index.js cart remove <productId> <userId>
```
- **View cart**: It retrieves the cart details form carts.json file.
```bash
node index.js cart view
```

- **Calculate cart total**: I used reduce method of array to get cart total by multiplying product quantity with product price and adding all does.
```bash
node index.js cart total
```

### Orders
- **Create an order**: This will clear the cart and make an order while creating order it will update the product inventory as well.
```bash
node index.js order create --userId=<userId>
```

- **List orders for a user**: This will list order detail of a user.
```bash
node index.js order list --userId=<userId>
```

## Learning Resources Used
- To understand more about CLI and on how to use and access command, I used following resource.
    - [process](https://eytanmanor.medium.com/how-clis-in-node-js-actually-work-c26f913a335e)

