var express = require('express');
var router = express.Router();

var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',function(req,res,next){
  res.render('register',{
    'title': 'Register'
  });
});

router.get('/login',function(req,res,next){
  res.render('login',{
    'title': 'Login'
  });
});

router.post('/register',function(req,res,next){
  console.log("Balle");
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  console.log(name+ "  " + email + "  " + password);
  if(req.files.profileimage){
    console.log("uploading file");
    var profileImageOriginalName = req.files.profileimage.originalname;
    var profileImageName         = req.files.profileimage.name;
    var profielImageMime         = req.files.profileimage.mimetype;
    var profileImagePath         = req.files.profileimage.path;
    var profielImageExt          = req.files.profileimage.extension;
    var profileImageSize         = req.files.profileimage.size;
  }
  else{
    var profileImageName = "noImage.png";
  }
  //form validation
  req.checkBody('name','Name Field is required').notEmpty();
  req.checkBody('email','Email Field is required').notEmpty();
  req.checkBody('email','Email not valid').isEmail();
  req.checkBody('username','Username Field is required').notEmpty();
  req.checkBody('password','Password Field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);
  
  //check for errors
  var errors = req.validationErrors();
  
  if(errors){
    res.render('register',{
      errors: errors
    });
  }else{
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileImageName         
      });
      
      User.createUser(newUser,function(err,user){
        if(err) throw err;
        console.log(user)
      });
      
      req.flash('success','You are now registered and may login');
      
      res.location('/');
      res.redirect('/');
  }
  
  
  
});

module.exports = router;
