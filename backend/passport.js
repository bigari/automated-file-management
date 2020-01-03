const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const jwtSecret = process.env["JWT_SECRET"];
const { User, Member, AnonymousUser } = require("./database/models/index");

const tokenExtractor = function(req) {
  //token will be extracted first from cookie if possible
  //If token not in cookie then we'll look in header
  let token = null;
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

const anonymousTokenExtractor = function(req) {
  //token will be extracted first from cookie if possible
  //If token not in cookie then we'll look in header
  let token = null;
  if (req) {
    if (req.cookies) {
      token = req.cookies["ajwt"];
    }
    if (!token && req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
  }

  return token;
};

passport.use(
  "jwt-user",
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

passport.use(
  "jwt-anonymous-user",
  new JwtStrategy(
    {
      jwtFromRequest: anonymousTokenExtractor,
      secretOrKey: jwtSecret
    },
    async (payload, done) => {
      try {
        const anonymousUser = await AnonymousUser.findOne({
          where: { id: payload.sub }
        });
        if (!anonymousUser) {
          return done(null, false);
        }
        done(null, anonymousUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  "jwt-member-anonymous",
  new JwtStrategy(
    {
      passReqToCallback: true,
      jwtFromRequest: anonymousTokenExtractor,
      secretOrKey: jwtSecret
    },
    async (req, payload, done) => {
      try {
        // Find the user specified in the token
        // So only for routes under a specific event
        const eid =
          req.params.eid ||
          req.params.eventId ||
          req.body.eid ||
          req.body.eventId;

          console.log(eid)
        if (!eid) {
          return done(null, false);
        }
        const member = await Member.findOne({
          where: { auid: payload.sub, eventId: eid }
        });

        console.log(member.dataValues)
        if (!member) {
          return done(null, false);
        }
        done(null, member);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  "jwt-member-staff",
  new JwtStrategy(
    {
      passReqToCallback: true,
      jwtFromRequest: tokenExtractor,
      secretOrKey: jwtSecret
    },
    async (req, payload, done) => {
      try {
        // Find the user specified in the token
        const eid =
          req.params.eid ||
          req.params.eventId ||
          req.body.eid ||
          req.body.eventId;

        if (!eid) {
          return done(null, false);
        }
        const member = await Member.findOne({
          where: { eventId: eid, userId: payload.sub }
        });
        if (!member) {
          return done(null, false);
        }
        done(null, member);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  "jwt-member-owner",
  new JwtStrategy(
    {
      passReqToCallback: true,
      jwtFromRequest: tokenExtractor,
      secretOrKey: jwtSecret
    },
    async (req, payload, done) => {
      try {
        // Find the user specified in the token
        const eid =
          req.params.eid ||
          req.params.eventId ||
          req.body.eid ||
          req.body.eventId;

        if (!eid) {
          return done(null, false);
        }
        const member = await Member.findOne({
          where: { eventId: eid, userId: payload.sub }
        });
        if (!member || member.role != 0) {
          return done(null, false);
        }
        done(null, member);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

module.exports = passport;
