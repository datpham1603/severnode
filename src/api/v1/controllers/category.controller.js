const Category = require('../models/category.model')
const Product = require('../models/product.model')
const getAllParentCategory = async () => {
    try {
        const categoryParent = await Category.find({ parent_id: null })
        console.log(categoryParent)
        return categoryParent
    } catch (err) {
        console.log(err)
    }
}

const insertCategory = async (name_category, parent_id) => {
    let category;
    console.log(name_category)
    const isExistNameCategory = await Category.find({ name_category });
    console.log(isExistNameCategory);
    if (isExistNameCategory.length === 0) {
        if (parent_id === null) {
            category = new Category({ name_category, parent_id: null });
        } else {
            category = new Category({ name_category, parent_id });
        }
        try {
            await category.save();
            console.log(category);
            return category;
        } catch (err) {
            console.log(err);
            return null;
        }
    } else {
        console.log('Category name already exists!');
        return null;
    }
};


const deleteCategory = async (categoryId) => {
    try {
        await Category.findOneAndDelete(categoryId)
    } catch (err) {
        console.log(err)
    }
}


const updateCategory = async (categoryId, name_category, parent_id) => {
    try {
        const newCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name_category, parent_id },
            { new: true }
        );
        return newCategory
    } catch (err) {
        console.log(err);
    }
}


const getAllSubcategory = async (parent_id) => {
    try {
        const listSubCategory = await Category.find({ parent_id });
        return listSubCategory
    } catch (err) {
        console.log(err);
    }
}

const getListProductCategory = async () => {
    try {
        const listProduct = [];
        const parentCategories = await Category.find({ parent_id: undefined });
        for (const category of parentCategories) {
            if (category.name_category === 'cây trồng') {
                const subCategories = await Category.find({ parent_id: category._id });
                const subCategoryIds = subCategories.map(subCategory => subCategory._id);
                const products = await Product.find({ category_id: { $in: subCategoryIds } });
                listProduct.push({
                    categoryId: category._id,
                    categoryName: category.name_category,
                    listProduct: products
                });
            }
            else{
                const products = await Product.find({ category_id: category._id});
                listProduct.push({
                    categoryId: category._id,
                    categoryName: category.name_category,
                    listProduct: products
                });
            }
           

        }
        return listProduct;
    } catch (err) {
        console.log(err);
        return [];
    }
}


module.exports = {
    getAllParentCategory,
    insertCategory,
    updateCategory,
    deleteCategory,
    getAllSubcategory,
    getListProductCategory
}