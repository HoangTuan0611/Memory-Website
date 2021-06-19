const Video = require('../models/Video');
const { mutipleMongooseToObject } = require('../../util/mongoose');


class SiteController {
    // [GET] /
    index(req, res, next) {
        Video.find({})
        .then((videos) => {
            res.render('home', {
                videos: mutipleMongooseToObject(videos),
            });
        })
        .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
