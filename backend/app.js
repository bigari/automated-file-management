const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const userController = require("./controllers/user");
const workspaceController = require("./controllers/workspace");
const { check } = require("express-validator");
const cookieParser = require("cookie-parser");
const passport = require("./passport");

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

app.post(
  "/workspaces",
  passport.authenticate("jwt", { session: false }),
  workspaceController.create.bind(workspaceController)
);
app.get(
  "/workspaces",
  passport.authenticate("jwt", { session: false }),
  workspaceController.list.bind(workspaceController)
);
app.get(
  "/workspaces/owned",
  passport.authenticate("jwt", { session: false }),
  workspaceController.listAsOwner.bind(workspaceController)
);


module.exports = app;
