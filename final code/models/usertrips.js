const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise=global.Promise;

const userTripSchema = new Schema({
    name :  { type: String, required: true},
    source :  { type: String, required: true},
    destination :  { type: String, required: true },
    todate:  { type: Date, required: true },
    fromdate:  { type: Date, required: true},
    lone:  { type: String, required: true },
    tripId:  { type: String, required: true },
    members:{type: Array},
    budget:{type:Number}
});

module.exports = mongoose.model('tripdetails', userTripSchema);