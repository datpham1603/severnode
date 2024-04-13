const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({

    name: { require: true, type: String },
    price: { require: true, type: String },
    product_detail: {
        origin: { type: String },
        quantity: { type: Number },
        size: { type: String }
    },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }


}, { collection: 'Products' })

productSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;


