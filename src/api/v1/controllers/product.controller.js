const Product = require('../models/product.model')


const addProduct = async (product) => {

    const { name, price, product_detail, images, category_id } = product;
    try {
        const newProduct = new Product({
            name,
            price,
            product_detail,
            images,
            category_id
        })
        const product = await newProduct.save();
        if (product) {
            return true
        }
        return false
    } catch (err) {
        console.log(err)
    }
}

const updateProductById = async (productId, updatedProduct) => {
    const { name, price, product_detail, images, category_id } = updatedProduct;
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId },
            { name, price, product_detail, images, category_id },
            { new: true }
        );
        if (updatedProduct) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const removeProductByid = async (id) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ _id: id });

        if (deletedProduct) {
            return true
        }
        return false
    } catch (err) {
        console.log(err);
    }
}

const getListProduct = async () => {
    try {
        const productList = await Product.find();
        return productList
    } catch (err) {
        console.log(err);
    }
}

const getListProducByCategoryId = async (category_id) => {
    try {
        const listProduct = await Product.find({ category_id });
        console.log(listProduct)
        return listProduct;
    } catch (err) {
        console.log(err)
    }
}

const getProductById = async (_id) => {
    try {
        const product = await Product.findOne({ _id });
        console.log(product)
        return product;
    } catch (err) {
        console.log(err)
    }
}

const getProductCart = async (arr) => {
    try {
        // Lấy mảng các _id từ arr
        const arrIds = arr.map(item => item.product_id);

        // Tìm tất cả các sản phẩm có _id trong arrIds
        const arrProduct = await Product.find({ _id: { $in: arrIds } });

        return arrProduct;
    } catch (err) {
        console.log(err);
        throw err; // Bạn nên throw lỗi để xử lý ở nơi gọi hàm getProductCart
    }
}






module.exports = {
    getProductCart,
    getProductById,
    addProduct,
    getListProduct,
    updateProductById,
    removeProductByid,
    getListProducByCategoryId
}