const Video = require('../models/Video');
const { mongooseToObject } = require('../../util/mongoose');

class VideoController {
    // [GET] /videos/:slug
    show(req, res, next) {
        Video.findOne({ slug: req.params.slug })
            .then((video) =>
                res.render('videos/show', {
                    video: mongooseToObject(video),
                }),
            )
            .catch(next);
    }

    // [GET] /videos/create
    create(req, res, next) {
        res.render('videos/create');
    }

    // [POST] /videos/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const video = new Video(req.body);
        video
            .save()
            .then(() => res.redirect('/me/stored/videos/' + req.body.userslug))
            .catch((error) => {});
    }

    // [GET] /videos/:id/edit
    edit(req, res, next) {
        Video.findById(req.params.id)
            .then((video) =>
                res.render('videos/edit', {
                    video: mongooseToObject(video),
                }),
            )
            .catch(next);
    }

    // [PUT] /videos/:id
    update(req, res, next) {
        Video.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/videos/' + req.body.userslug))
            .catch(next);
    }

    // [DELETE] /videos/:id
    destroy(req, res, next) {
        Video.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /videos/:id/force
    forceDestroy(req, res, next) {
        Video.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /videos/:id/restore
    restore(req, res, next) {
        Video.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new VideoController();
