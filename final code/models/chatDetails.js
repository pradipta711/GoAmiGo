const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise=global.Promise;

const ChatDetailsSchema = new Schema({
    chatId: {type:String,required:true},
    text: {type:String,required:true},
    date: {type:Date,required:true},
    senderId:{type:String},
    receiverId:{type:String}
});

module.exports = mongoose.model('chatdetails', ChatDetailsSchema);