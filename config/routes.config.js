const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
]

/* Main route */
router.get('/', (req, res, next) => res.send('Hello world'))

//SignUp
router.get('/signup', authController.signup);
router.post('/signup', authController.doSignup);

//Login
router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/login/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/auth/google/callback', authController.doLoginGoogle)

module.exports = router;