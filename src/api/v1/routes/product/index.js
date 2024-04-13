const express = require('express');
const productController = require('../../controllers/product.controller');
const router = express.Router();

router.get('/getlistproduct', async (req, res) => {
    try {
        const productList = await productController.getListProduct();
        res.json(
            {
                message: 'success',
                productList
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getproductbyId', async (req, res) => {
    try {
        const { _id } = req.query;
        console.log(_id)
        const product = await productController.getProductById(_id);
        res.json(product)
    } catch (err) {
        console.log(err)
    }
})

router.get('/getproductByCategoryId', async (req, res) => {
    try {
        const { category_id } = req.query;
        const productList = await productController.getListProducByCategoryId(category_id);
        res.json(
            {
                message: 'success',
                productList
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/insert/product', async (req, res) => {
    try {
        const addedProduct = await productController.addProduct(req.body);
        res.json(
            {
                message: 'Product added successfully',
                addedProduct
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/update/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = req.body;
        const success = await productController.updateProductById(productId, updatedProduct);
        if (success) {
            console.log('Thành công');
            res.json({ message: 'Cập nhật sản phẩm thành công' });
        } else {
            console.log('Thất bại');
            res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
});

router.delete('/delete/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const success = await productController.removeProductByid(productId);
        if (success) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/getProductCart', async (req, res) => {
    try {
        const queryString = req.query.arrIdProduct;
        const arrIdProduct = JSON.parse(decodeURIComponent(queryString));
        console.log(arrIdProduct);
        const success = await productController.getProductCart(arrIdProduct);
        if (success) {
            console.log(success)
            res.json(success);
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
