const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const jwtSecret = process.env["JWT_SECRET"];
const { User } = require("./database/models/index");

const tokenExtractor = function(req) {
  //token will be extracted first from cookie if possible
  //If token not in cookie then we'll look in header
  var token = null;
  if (req) {
    if (req.cookies) {
      token = req.cookies["jwt"];
    }
    if (!token && req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
  }

  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: tokenExtractor,
      secretOrKey: jwtSecret
    },
    async (payload, done) => {
      try {
        // Find the user specified in the token
        const user = await User.findOne({ where: { id: payload.sub } });
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

module.exports = passport;
