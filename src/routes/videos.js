const express = require('express');
const router = express.Router();

const videoController = require('../app/controllers/VideoController');

router.get('/create', videoController.create);
router.post('/store', videoController.store);
router.get('/:id/edit', videoController.edit);
router.put('/:id', videoController.update);
router.patch('/:id/restore', videoController.restore);
router.delete('/:id', videoController.destroy);
router.delete('/:id/force', videoController.forceDestroy);
router.get('/:slug', videoController.show);

module.exports = router;
