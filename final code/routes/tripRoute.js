const Trip= require('../models/trip'); 
const config = require('../config/database'); 

module.exports = (router) => {


  router.post('/usertrip', (req, res) => {
          console.log("request printed is" , req.body)
          let trip = new Trip({
            userId : req.body.userId,
            tripId : req.body.tripId
          });
          // Save user to database
          trip.save((err) => {
            if(err){
               console.log("here"+trip)

                  res.json({ success: false, message: 'Could not save trip. Error: ', err }); // Return error if not related to validation
                } else {
                  console.log("nothere"+trip)

                  res.json({ success: true, message: 'Trip Saved' }); // Return success
                }
          });


  });
      
  return router; 
}