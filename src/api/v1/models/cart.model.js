const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    user_id: { type: mongoose.Schema.Types.ObjectId },
    listProduct: [{
        product_id: { type: mongoose.Schema.ObjectId },
        quantity: { type: Number}
    }],

});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart; 