const Transaction = require('../models/transactions'); 
const config = require('../config/database'); 

module.exports = (router) => {


  router.post('/transactions', (req, res) => {
    console.log(req.body.tripId);
          let transaction = new Transaction({
            txId:req.body.txId,
            userId: req.body.userId,
            tripId: req.body.tripId,
            txamount: req.body.txamount,
            txdate: req.body.txdate,
            type: req.body.type,
            availableBal: req.body.availableBal,
            description: req.body.description
          });
          // Save user to database
          transaction.save((err) => {
            if(err){
                  res.json({ success: false, message: 'Could not save transaction. Error: ', err }); // Return error if not related to validation
                } else {
                  res.json({ success: true, message: 'transaction Saved' }); // Return success
                }
          });


  });

  router.get('/getTxTripId' ,(req,res) => {
  console.log("called:")
    console.log(req);
   
    Transaction.find({ tripId: req.query.tripId, type: 'debit' }, (err, transactions) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if username was found
            if (!transactions) {
              res.json({ success: false, message: 'Username not found to find trips.' }); // Return error
            } else {
              res.json({ data: transactions
              });
            }
            }
          }).sort({'txdate':-1});
        });

        router.put('/transactions', (req, res) => {
          // console.log(req.body.tripId);
              
                // Save user to database
                Transaction.update({txId: req.body.txId},{txId:req.body.txId,
                  userId: req.body.userId,
                  tripId: req.body.tripId,
                  txamount: req.body.txamount,
                  txdate: req.body.txdate,
                  type: req.body.type,
                  availableBal: req.body.availableBal},(err) => {
                  if(err){
                        res.json({ success: false, message: 'Could not save transaction. Error: ', err }); // Return error if not related to validation
                      } else {
                        res.json({ success: true, message: 'transaction updated!!!' }); // Return success
                      }
                });
      
      
        });
      
      
  return router; 
}