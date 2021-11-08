import mongoose, { Schema } from "mongoose";
const salesSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref:'user',
    unique:true,
    required: true,
  },
  person: {
    type: Schema.ObjectId,
    ref:'person',
    unique:true,
    required: true,
  },
  voucherType: {
    type: String,
    maxlength: 20,
    required: true,
  },
  voucherSerie: {
    type: String,
    maxlength: 7,
  },
  voucherNum: {
    type: String,
    maxlength: 10,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  details: [
    {
      _id: {
        type: String,
        required: true,
      },
      article: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
    },
  ],
  state: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Sales = mongoose.model("sales", salesSchema); //conversion a modelo

export default Sales;
