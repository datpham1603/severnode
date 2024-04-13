const Cart = require('../models/cart.model')

const getCart = async (userId) => {
   try {
      const cart = await Cart.findOne({ user_id: userId });
      console.log(cart);
      return cart;
   } catch (error) {
      console.log(err)
   }
}

const addProductFromCart = async (userId, productId, quantity) => {
   console.log(quantity);
   console.log(productId);
   console.log(userId)
   try {
      let cart = await Cart.findOne({ user_id: userId });
      if (!cart) {
         cart = await Cart.create({ user_id: userId, listProduct: [] });
      }

      let newCart = null; // Khởi tạo newCart với giá trị ban đầu là null

      for (let i = 0; i < cart.listProduct.length; i++) {
         console.log(quantity);
         if (cart.listProduct[i].product_id.toString() === productId.toString()) {
            cart.listProduct[i].quantity += quantity;
            newCart = await Cart.findOneAndUpdate({ user_id: userId }, cart, { new: true });
            return newCart; // Trả về giỏ hàng mới đã được cập nhật
         }
      }

      if (newCart === null) {
         cart.listProduct.push({ product_id: productId, quantity: quantity });
         newCart = await cart.save();
         return newCart; // Trả về giỏ hàng mới đã được cập nhật
      }

      return cart;
   } catch (error) {
      throw error;
   }
}


const removeProductFromCart = (userId, productId) => {
   try {
      const success = Cart.findByIdAndDelete({ userId: userId, "listProduct.product_id": productId });
      return success
   } catch (err) {
      console.log(err);
   }
}

module.exports = {
   getCart,
   addProductFromCart,
   removeProductFromCart
}