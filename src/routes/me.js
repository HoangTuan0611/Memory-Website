const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/user/profile', meController.profileUsers);
router.get('/stored/videos', meController.storedVideos);
router.get('/trash/videos', meController.trashVideos);

module.exports = router;