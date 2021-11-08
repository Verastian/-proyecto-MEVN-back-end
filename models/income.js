import mongoose, {Schema} from "mongoose";

const incomeSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    unique:true,
    ref: "user",
    required: true,
  },
  person: {
    type: Schema.ObjectId,
    unique:true,
    ref: "person",
    required: true,
  },
  voucherType: {
    type: String,
    maxlength: 20,
    required: true,
  },
  voucherSeries: {
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
  details: [{ //Modelado embebido apropiado para relaciones 1 a pocos y los datos no cambian a menudo o no se mantienen por separado. ventaja, no es necesario hacer una query separada para obtener los detalles.
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
  }],
  state: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Income = mongoose.model('income',incomeSchema);

export default Income;