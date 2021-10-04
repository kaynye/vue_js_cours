const express = require("express");
const router = express.Router();
const userController = require('../controllers/users.js');
const auth = require('../middleware/auth.js');


router.post('/signup', userController.signUp);

router.post('/login', userController.login);

router.delete('/delete/:id', auth, userController.deleteUser);

// router.delete('/admin/delete/:id', auth, userController.deleteAccountAdmin);

// router.get('/:id', auth, userController.getOneUser)

// router.get('/admin/users', auth, userController.getAllUsers)

module.exports = router;

