const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise=global.Promise;

const tripSchema = new Schema({
    userId :  { type: String, required: true},
    tripId :  { type: String, required: true},
});

module.exports = mongoose.model('trip', tripSchema);