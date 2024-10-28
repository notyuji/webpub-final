const express = require('express');
const router = express.Router();

const products = [
    { id: 1, name: "Hot Americano", price: 140.00 },
    { id: 2, name: "Iced Americano", price: 150.00 },
    { id: 3, name: "Hot Latte", price: 150.00 },
    { id: 4, name: "Hot Mocha", price: 145.00 },
    { id: 5, name: "Iced Latte", price: 160.00 },
    { id: 6, name: "Iced Mocha", price: 155.00 },
    { id: 7, name: "Shrimp & Basil Pasta", price: 150.00 },
    { id: 8, name: "Pesto Pasta", price: 130.00 },
    { id: 9, name: "Cheesy Tortilla", price: 120.00 },
];

let cart = [];

router.post('/', (req, res) => {
    const { itemId, quantity } = req.body;

    const product = products.find(p => p.id === itemId);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    const existingItemIndex = cart.findIndex(item => item.id === itemId);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        const cartItem = {
            id: itemId,
            name: product.name,
            quantity,
            price: product.price
        };
        cart.push(cartItem);
    }

    res.json(cart);
});

router.patch('/quantity', (req, res) => {
    const { itemId, delta } = req.body;

    const existingItemIndex = cart.findIndex(item => item.id === itemId);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += delta;

        if (cart[existingItemIndex].quantity <= 0) {
            cart.splice(existingItemIndex, 1);
        }

        return res.json(cart);
    } else {
        return res.status(404).json({ error: "Item not found in cart" });
    }
});

router.get('/', (req, res) => {
    res.json(cart);
});

module.exports = router;
