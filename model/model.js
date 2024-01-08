const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required *"],
  },
  description: {
    type: String,
    required: [true, "descriptions is required *"],
  },
  price: {
    type: Number,
    required: [true, "price is Required"],
  },
  oldPrice: {
    type: Number,
    required: [true, "old price is Required"],
  },
  category:{
    type:String ,
    required:[true, "category is required*"]
  },
  sku: {
    type: String,
    required: [true, "sku is required"],
  },
 image:[
  {
    public_id:String , 
    url:String
  }
 ]
},{timestamps:true});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
