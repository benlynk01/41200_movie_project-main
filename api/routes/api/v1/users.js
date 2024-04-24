const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', passport.authenticate('register', {session: false}), async(req, res) => {
    res.status(200).json({
        message: 'Registration successful',
        user: req.user
    });
});

router.post('/login',
    passport.authenticate('login', { session: false }),
    (req, res) => {
        const payload = {
            name: req.user.name,
            username: req.user.username
        };
        const token = jwt.sign(payload, process.env.TOP_SECRET_KEY, { expiresIn: '1d' }); 
        res.status(200).json({ accessToken: token });
    },
    (err, req, res, next) => {
        // Handle authentication errors
        res.status(401).json({ message: 'Authentication failed' });
    }
); 

router.get('/me', passport.authenticate('jwt', {session: false}), (req,res) => {
    res.status(200).json(req.user);
});

module.exports = router;
