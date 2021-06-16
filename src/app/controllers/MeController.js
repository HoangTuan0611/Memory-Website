const Video = require('../models/Video');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { restore } = require('./VideoController');
var localStorage = require('localStorage')

class MeController {
    // [GET] /me/stored/videos
    storedVideos(req, res, next) {
        Promise.all([Video.find({}), Video.countDocumentsDeleted()])
            .then(([videos, deletedCount]) =>
                res.render('me/stored-videos', {
                    deletedCount,
                    videos: mutipleMongooseToObject(videos),
                }),
            )
            .catch(next);
    }

    // [GET] /me/trash/videos
    trashVideos(req, res, next) {
        Video.findDeleted({})
            .then((videos) =>
                res.render('me/trash-videos', {
                    videos: mutipleMongooseToObject(videos),
                }),
            )
            .catch(next);
    }

    profileUsers(req, res, next){
        //res.render('auth/profile');
        console.log(accessToken);
        User.findOne({ accessToken: req.body.accessToken })
        .then((user) =>
            res.render('auth/profile', {
                user: mongooseToObject(user),
            }),
        )
        .catch(next);
    }
}

module.exports = new MeController();
