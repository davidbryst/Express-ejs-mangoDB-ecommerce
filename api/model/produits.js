const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // sold: {
    //   type: Number,
    //   default: 0,
    // },
    quantity: {
      type: Number,
      default: 0,
    },
    // category: {
    //   type: ObjectId,
    //   ref: "categories",
    // },
    images: {
      type: Array,
      required: true,
    },
    // offer: {
    //   type: String,
    //   default: null,
    // },
    // ratingsReviews: [
    //   {
    //     review: String,
    //     user: { type: ObjectId, ref: "users" },
    //     rating: String,
    //     createdAt: {
    //       type: Date,
    //       default: Date.now(),
    //     },
    //   },
    // ],
    // status: {
    //   type: String,
    //   required: true,
    // },
},
{ timestamps: true });

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;