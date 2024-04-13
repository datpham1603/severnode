const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category.controller');

router.get('/getlistcategory', async (req, res) => {
    try {
        const listCategory = await categoryController.getAllParentCategory();
        res.json({ listCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getlistcategoryproduct', async (req, res) => {
    try {
        const listProduct = await categoryController.getListProductCategory();
        res.json({ listProduct })
    } catch (err) {
        console.log(err)
    }
})

router.post('/insert/category', async (req, res) => {
    const { name_category, parent_id } = req.body;
    try {
        const category = await categoryController.insertCategory(name_category, parent_id);
        if (!category) {
            res.json({ message: "Category name is already existed" });
            return;
        }
        res.json({ message: "Category created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete/category/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        await categoryController.deleteCategory(categoryId);
        console.log('thành công')
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getsubcategory', async (req, res) => {
    const { parent_id } = req.query;
    const listSubCategory = await categoryController.getAllSubcategory(parent_id);
    if (listSubCategory) {
        res.json({
            message: "suscess",
            listSubCategory
        })
    }
})



router.put('/update/category/:id', async (req, res) => {
    const categoryId = req.params.id;
    const { name, parent_id } = req.body;
    try {
        await categoryController.updateCategory(categoryId, name, parent_id);
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
