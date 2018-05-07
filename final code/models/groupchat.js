const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise=global.Promise;

const groupChatSchema = new Schema({
    tripId :  { type: String, required: true},
    chatId: {type: String}
});

module.exports = mongoose.model('groupchat', groupChatSchema);