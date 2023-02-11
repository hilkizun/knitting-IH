const router = require('express').Router();
const authController = require('../controllers/auth.controller');

/* Main route */
router.get('/', (req, res, next) => res.send('Hello world'))

//SignUp
router.get('/signup', authController.signup);
router.post('/signup', authController.doSignup);

//Login
router.get('/login', authController.login);
router.post('/login', authController.doLogin);

module.exports = router;