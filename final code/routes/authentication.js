const User = require('../models/user'); 
const config = require('../config/database'); 

module.exports = (router) => {


  router.post('/register', (req, res) => {
          let user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
          });
          // Save user to database
          user.save((err) => {
            if(err){
                  res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                } else {
                  res.json({ success: true, message: 'Acount registered!' }); // Return success
                }
          });


  });


  router.post('/login' ,(req,res) => {
  
   
    User.findOne({ username: req.body.username }, (err, user) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if username was found
            if (!user) {
              res.json({ success: false, message: 'Username not found.' }); // Return error
            } else {
              const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
              // Check if password is a match
              if (!validPassword) {
                res.json({ success: false, message: 'Password invalid' }); // Return error
              } else {
                res.json({ success: true, message: 'Success!'
                });
              }
             }
            }
          });
        });
          
        router.get('/usercheck' ,(req,res) => {
  
   
          User.findOne({ username: req.body.username }, (err, user) => {
                  // Check if username was found
                  if (!user) {
                    res.json({ success: false }); // Return error
                  }else{
                    res.json({ success: true});
                  }
                
              }
          )});
      
  return router; 
}