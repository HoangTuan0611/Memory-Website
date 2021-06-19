const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/user/profile/:slug', meController.profileUsers);
router.get('/stored/videos/:userslug', meController.storedVideos);
router.get('/trash/videos', meController.trashVideos);

module.exports = router;