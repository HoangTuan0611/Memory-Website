const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.put('/:id', loginController.update);
router.post('/login', loginController.login);
router.post('/create', loginController.create);
router.get('/:slug', loginController.show);
router.get('/', loginController.index);


module.exports = router;
