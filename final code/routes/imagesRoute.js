var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var path = require('path');
 
//path and originalname are the fields stored in mongoDB
var imageSchema = mongoose.Schema({
 path: {
 type: String,
 required: true,
 trim: true
 },
 originalname: {
 type: String,
 required: true
 }
//  tripId: {
//     type: String,
//     required: true
//     }
 
});
 
 
var Image = module.exports = mongoose.model('files', imageSchema);
 
router.getImages = function(callback, limit) {
 
 Image.find(callback).limit(limit);
}
 
 
router.getImageById = function(id, callback) {
  
 Image.findById(id, callback);
 
}
 
router.addImage = function(image, callback) {
 Image.create(image, callback);
}
 
 
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'cliend/src/assets/uploads');
 },
 filename: function(req, file, cb) {
 cb(null,file.originalname);
 }
});


var upload = multer({
  storage: storage
 });
 
router.post('/imgtodb', upload.any(), function(req, res, next) {
 res.send(req.files);
 var path = req.files[0].path;
 var imageName = req.files[0].originalname;
 
 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;

 router.addImage(imagepath, function(err) {
  
 });

});


router.get('/getimages', (req, res) => {
  // Search database for all blog posts
  Image.find({}, (err, images) => {
    // Check if error was found or not
    if (err) {
      res.json({ success: false, message: err }); // Return error message
    } else {
      // Check if blogs were found in database
      if (!images) {
        res.json({ success: false, message: 'No images found.' }); // Return error of no blogs found
      } else {
        res.json({ success: true, images: images }); // Return success and blogs array
      }
    }
  }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
});

// router.post('/download', function(req,res,next){
//   console.log("filename is", req.body.originalname, req.body.filename);
//   filepath = path.join(__dirname,'../public') +'/'+ req.body.filename;
//   res.sendFile(filepath);
 
// });
 
module.exports = router;