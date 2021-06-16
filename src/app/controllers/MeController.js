const Video = require('../models/Video');
const { mutipleMongooseToObject } = require('../../util/mongoose');

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
        res.render('auth/profile');
    }
}

module.exports = new MeController();
