const Video = require('../models/Video');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { restore } = require('./VideoController');

class MeController {
    // [GET] /me/stored/videos
    storedVideos(req, res, next) {
        console.log(req.params.userslug);
        Promise.all([Video.find({userslug: req.params.userslug}), Video.countDocumentsDeleted()])
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
        User.findOne({ slug: req.params.slug })
        .then((user) =>
            res.render('auth/profile', {
                user: mongooseToObject(user),
            }),
        )
        .catch(next);
    }
}

module.exports = new MeController();
