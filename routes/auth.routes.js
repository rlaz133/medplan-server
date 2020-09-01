const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const {PatientModel, DoctorModel} = require('../models/User.models');
const {isLoggedIn} = require('../helpers/auth.helper')

router.post('/auth/signup', (req, res) => {
    const {username, email, password, usertype, allergies, history} = req.body;
    console.log(username, email, password);
 
    if (!username || !email || !password) {
        res.status(500)
          .json({
            errorMessage: 'Please enter username, email and password'
          });
        return;  
    }

    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
        res.status(500)
          .json({
            errorMessage: 'Email format not correct'
        });
        return;  
    }

    const myPassRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    if (!myPassRegex.test(password)) {
      res.status(500)
          .json({
            errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet'
          });
        return;  
    }
    if (usertype==='patient'){
    bcrypt.genSalt(10)
        .then((salt) => {
          bcrypt.hash(password, salt)
            .then((passwordHash) => {
              PatientModel.create({email, username, passwordHash})
                .then((user) => {
                  user.passwordHash = "***";
                  req.session.loggedInUser = user;
                  req.session.usertype = 'patient'
                  res.status(200).json(user);
                })
                .catch((err) => {
                  if (err.code === 11000) {
                    res.status(409)
                    .json({
                      errorMessage: 'username or email entered already exists!'
                    });
                    return;  
                  } 
                  else {
                    res.status(404)
                    .json({
                      errorMessage: 'Something went wrong!'
                    });
                    return; 
                  }
                })
            });  
        });
    }
    if (usertype==='doctor'){
      bcrypt.genSalt(10)
          .then((salt) => {
            bcrypt.hash(password, salt)
              .then((passwordHash) => {
                DoctorModel.create({email, username, passwordHash})
                  .then((user) => {
                    user.passwordHash = "***";
                    req.session.loggedInUser = user;
                    req.session.usertype = 'doctor'
                    res.status(200).json(user);
                  })
                  .catch((err) => {
                    if (err.code === 11000) {
                      res.status(409)
                      .json({
                        errorMessage: 'username or email entered already exists!'
                      });
                      return;  
                    } 
                    else {
                      res.status(404)
                      .json({
                        errorMessage: 'Something went wrong!'
                      });
                      return; 
                    }
                  })
              });  
          });
      }

});
 
router.post('/auth/login', (req, res) => {
    const {email, password, usertype } = req.body;
    if ( !email || !password) {
        res.status(500).json({
            error: 'Please enter Username. email and password',
       })
      return;  
    }
    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
        res.status(500).json({
            error: 'Email format not correct',
        })
        return;  
    }
  if(usertype==='patient'){
    PatientModel.findOne({email})
      .then((userData) => {
          bcrypt.compare(password, userData.passwordHash)
            .then((doesItMatch) => {
                if (doesItMatch) {
                  userData.passwordHash = "***";
                  req.session.loggedInUser = userData;
                  req.session.usertype = 'patient'
                  res.status(200).json(userData)
                }
                else {
                    res.status(500).json({
                        error: 'Passwords don\'t match',
                    })
                  return; 
                }
            })
            .catch(() => {
                res.status(500).json({
                    error: 'Email format not correct',
                })
              return; 
            });
      })
      .catch((err) => {
        res.status(500).json({
            error: 'Could not find that email in that category.',
            message: err
        })
        return;  
      });
  }

  if(usertype==='doctor'){
    DoctorModel.findOne({email})
      .then((userData) => {
          bcrypt.compare(password, userData.passwordHash)
            .then((doesItMatch) => {
                if (doesItMatch) {
                  userData.passwordHash = "***";
                  req.session.loggedInUser = userData;
                  req.session.usertype = 'doctor'
                  res.status(200).json(userData)
                }
                else {
                    res.status(500).json({
                        error: 'Passwords don\'t match',
                    })
                  return; 
                }
            })
            .catch(() => {
                res.status(500).json({
                    error: 'Email format not correct',
                })
              return; 
            });
      })
      .catch((err) => {
        res.status(500).json({
            error: 'Could not find that email in that category.',
            message: err
        })
        return;  
      });
  }
  
});
 
router.post('/auth/logout', (req, res) => {
    req.session.destroy();
    res
    .status(204) //  No Content
    .send();
})

router.get("/user", isLoggedIn, (req, res, next) => {
  res.status(200).json(req.session);
});


  module.exports = router;
