const express = require('express')
const router = express.Router()
const Cart = require('../controllers/cart.controller')


router.post('/addproductfromcart', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.addProductFromCart(userId, productId, quantity);
    if (!cart) {
        res.json({
            'message': true
        })
    }

})

router.get('/getcart', async (req, res) => {
    const { userId } = req.query;
    console.log(userId)
    const cart = await Cart.getCart(userId);
    console.log(cart);
    if (cart) {
        res.json({ cart });
    }
    else {
        res.json('lỗi')
    }

})

router.delete('/deletecart', async (req, res) => {
    const { userId, product_id } = req.query;
    const cart = await Cart.removeProductFromCart(userId, product_id);
    if (cart) {
        res.json({ 'message': true });
    }

})

module.exports = router