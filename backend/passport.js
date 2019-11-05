const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const jwtSecret = process.env['JWT_SECRET'];
const {User} = require('./database/models/index');
const LocalStrategy = require('passport-local').Strategy;



const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: jwtSecret,
    passReqToCallback: true
}, async (payload, done) => {
    try{
        // Find the user specified in the token
        const user = await User.findOne({ where : { id: payload.sub } });
        if(!user) {
            return done(null, false);
        }
        done(null, user);

    }catch(error){
        done(error, false)
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try{
        const user = await User.findOne({ email: email});
        if(!user) {
            return done(null, false);
        }

        // const isValid = await User.isValidPassword(password, user.password);

        // if(!isValid) {
        //     return done(null, false);
        // }

        done(null, user);

    }catch(error) {
        done(error, false);
    }
}));


module.exports = passport;