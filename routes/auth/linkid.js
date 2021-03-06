const express = require('express');
const router = express.Router();

const userModel = require('models/user');

const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin');
const config = require('config');

/**
 * Created by Avd on 10.04.2017.
 */

passport.use(new LinkedInStrategy({
        consumerKey: config.get('auth:linkedinAuth:clientID'),
        consumerSecret: config.get('auth:linkedinAuth:clientSecret'),
        callbackURL: config.get('rootURL') + ':' + config.get('port') + config.get('auth:linkedinAuth:callbackPath')
    },
    function(token, tokenSecret, profile, done) {
        User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));

//Linkedin auth handler
router.get('/', passport.authenticate('linkedin'));

router.get('/callback', passport.authenticate('linkedin', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/users');
    });


module.exports = router;