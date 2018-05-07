const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise=global.Promise;

const transactionSchema = new Schema({
    txId:{ type: String, required: true},
    userId :  { type: String, required: true},
    tripId :  { type: String, required: true},
    txamount:{ type: Number, required: true},
    txdate:{ type: Date, required: true},
    type:{ type: String, required: true},
    availableBal:{ type: Number, required: true},
    description: {type: String}
});

module.exports = mongoose.model('transactions', transactionSchema);