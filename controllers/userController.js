const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


exports.login = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        // errors.email = 'User not found';
        return res.status(404).json({msg:"User Not Found"});
      }
  
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name,email:user.email }; // Create JWT Payload
  
          // Sign Token
          jwt.sign(
            payload,
            keys.secret,
            
            (err, token) => {
              res.json({
                success: true,
                username:user.name,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
        //   errors.password = 'Password incorrect';
          return res.status(400).json({msg:"Password Incorrect"});
        }
      });
    });
}

exports.register = (req,res) => {
    User.findOne({ email: req.body.email })
    .then( user => {
        if(user) {
            return res.status(400).json({email:'Email Already Exists'});
        }else {
            
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                password:req.body.password,

            });

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    return res.status(200).json({ msg : "User Created" });
                })
            })
        }
    })
}

exports.getInfo = (req,res) => {
    res.json({
        id:req.user.id,
        name:req.user.name,
        mobile:req.user.mobile,
        email:req.user.email,
    }); 
}