const GroupChat= require('../models/groupchat'); 
const config = require('../config/database'); 
const ChatDetails=require('../models/chatDetails');
module.exports = (router) => {


  router.post('/chatdetails', (req, res) => {
          console.log("request printed is" , req.body)
          let chatdetails = new ChatDetails({
            chatId : req.body.chatId,            
            text: req.body.text,
            date: req.body.date,
            senderId:req.body.senderId,
            receiverId:req.body.receiverId
          });
          // Save user to database
          chatdetails.save((err) => {
            if(err){
               //console.log("here"+groupchat)

                  res.json({ success: false, message: 'Could not save chat. Error: ', err }); // Return error if not related to validation
                } else {
                  // console.log("nothere"+groupchat)

                  res.json({ success: true, message: 'chat Saved' }); // Return success
                }
          });
  });


  router.post('/groupchatdetails',(req,res) =>{
    console.log("ing group chat post method")
    let groupchatdetails = new GroupChat({
      tripId: req.body.tripId,
      chatId: req.body.chatId
    });

    groupchatdetails.save((err)=>{
      if(err){

           res.json({ success: false, message: 'Could not save chat id and trip id. Error: ', err }); // Return error if not related to validation
         } else {
           // console.log("nothere"+groupchat)

           res.json({ success: true, message: 'tripid and chat id Saved' }); // Return success
         }
    });
  }
);

router.get('/getchatid' ,(req,res) => {
  
  console.log(req.query.tripId);
 
  GroupChat.find({ tripId: req.query.tripId}, (err, chat) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: err }); // Return error
        } else {
          // Check if username was found
          if (!chat) {
            res.json({ success: false, message: 'Username not found to find trips.' }); // Return error
          } else {
            res.json({ data: chat
            });
          }
          }
        }).sort({'txdate':-1});
      });


      router.get('/getchat' ,(req,res) => {
  
        console.log(req.query.tripId);
       
        ChatDetails.find({ chatId: req.query.chatId}, (err, chat) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error
              } else {
                // Check if username was found
                if (!chat) {
                  res.json({ success: false, message: 'Username not found to find trips.' }); // Return error
                } else {
                  res.json({ data: chat
                  });
                }
                }
              }).sort({'date':-1});
            });
  return router; 
}