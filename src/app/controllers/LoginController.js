const Login = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "myAccessTokenSecret1234567890";
var localStorage = require('localStorage')

class LoginController {

    // [GET] /auth/login
    index(req, res, next) {
        res.render('auth/login');
    }

    show(req, res, next) {
        Login.findOne({ slug: req.params.slug })
        .then((user) =>
            res.render('auth/profile', {
                user: mongooseToObject(user),
            }),
        )
        .catch(next);
    }

    // [POST] /auth/login
    login(req, res, next){
        var email = req.body.email;
        var password = req.body.password;
        console.log(email);
        console.log(password);
        Login.findOne({
            "email":email
        }, function(error, user){
            if(user == null){
                res.json({
                    "status": "error",
                    "message": "Email does not exist"
                });
            }
            else{
                bcrypt.compare(password, user.password, function (error, isVerify) {
                    if (isVerify) {
                        var accessToken = jwt.sign({ email: email }, accessTokenSecret);
                        Login.findOneAndUpdate({
                            "email": email
                        },{
                            $set: {
                                "accessToken": accessToken
                            }
                        },
                        function (error, data) {
                            // res.json({
                            //     "status": "success",
                            //     "message" : "Login successfull",
                            //     "accessToken" : accessToken
                            // })
                            res.render('auth/profile', {user: mongooseToObject(user)});
                        });
                    } else {
                        res.json({
                            "status": "error",
                            "message": "Password is not correct"
                        });
                    }
                }); 
            }
        });
    }
    // [POST] /auth/create
    create(req, res, next) {
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.phone;
        var password = req.body.password;
        var username = req.body.username;
        
        Login.findOne({
                $or: [{
                    "email": email
                }, {
                    "username": username
                }]
            },function (error, user) {
				if (user == null) {
					bcrypt.hash(password, 10, function (error, hash) {
						Login.create({
                            "username": username,
							"name": name,
							"phone": phone,
							"email": email,
							"password": hash,
                            "videos": [],
						}, function (error, data) {
                            res.redirect('/auth')
						});
					});
				} else {
					res.json({
						"status": "error",
						"message": "Email or username already exist."
					});
				}
			})
    }

    // [PUT] /auth/:id
    update(req, res, next) {
        Login.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/user/profile'))
            .catch(next);
    }
}

module.exports = new LoginController();
