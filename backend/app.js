const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const userController = require("./controllers/user");
const eventController = require("./controllers/event");
const { check } = require("express-validator");
const cookieParser = require("cookie-parser");
const passport = require("./passport");
const questionController = require("./controllers/question");
const memberController = require("./controllers/member");
const anonymousUserController = require("./controllers/anonymous_user");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Max-Age", 86400);
  next();
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post(
  "/signin",
  [check("email").isEmail(), check("password").exists()],
  userController.signin.bind(userController)
);

app.post(
  "/signup",
  [
    check("username").exists(),
    check("email").isEmail(),
    check("password").exists()
  ],
  userController.signup.bind(userController)
);

app.post("/logout", userController.logout);

app.post(
  "/events",
  passport.authenticate("jwt-user", { session: false }),
  eventController.create.bind(eventController)
);

app.get(
  "/events",
  passport.authenticate("jwt-user", { session: false }),
  eventController.list.bind(eventController)
);

app.get(
  "/validateCookie",
  passport.authenticate("jwt-user", { session: false }),
  userController.validateCookie
);

app.get(
  "/events/:eid/qas",
  questionController.fetchQuestions.bind(questionController)
);

app.post(
  "/questions/:qid/reply",
  passport.authenticate("jwt-member-staff", { session: false }),
  questionController.reply.bind(questionController)
);

app.delete(
  "/questions/:qid",
  passport.authenticate("jwt-member-staff", { session: false }),
  questionController.deleteQuestion.bind(questionController)
);

app.post(
  "/events/:eid/qas",
  passport.authenticate(["jwt-member-anonymous", "jwt-member-staff"], {
    session: false
  }),
  questionController.createQuestion.bind(questionController)
);

app.get(
  "/events/:eid/members",
  // passport.authenticate("jwt", { session: false }),
  eventController.fetchMembers.bind(eventController)
);

app.post(
  "/events/:eid/members",
  passport.authenticate("jwt-member-owner", { session: false }),
  eventController.addMember.bind(eventController)
);

app.post(
  "/members",
  passport.authenticate("jwt-anonymous-user", { session: false }),
  memberController.createAnonymousMember.bind(memberController)
);

app.post(
  "/anonymous-users",
  anonymousUserController.create.bind(anonymousUserController)
);

app.get(
  "/anonymous-users/auth",
  passport.authenticate("jwt-anonymous-user", { session: false }),
  anonymousUserController.auth.bind(anonymousUserController)
);

module.exports = app;
