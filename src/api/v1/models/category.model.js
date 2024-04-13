const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

    name_category:{type:String,require:true},
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
    
}, { collection: 'categorys' })

const Category = mongoose.model('Category', categorySchema)
module.exports = Category;