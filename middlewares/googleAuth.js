const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserService = require("../services/user");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const userService = new UserService();

module.exports = async function GoogleAuth(app, passport) {
  app.use(
    session({
      secret: "your-session-secret",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        cb(null, profile);
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "http://127.0.0.1:5173/login",
    }),
    async function (req, res) {
      let user = await userService.findUserWithGoogleId(req.user.id);
      if (!user) {
        const body = {
          firstName: req.user.name.givenName,
          lastName: req.user.name.familyName,
          image: req.user.photos[0].value,
          googleId: req.user.id,
          email: "",
        };
        user = await userService.createUser(body);
      }
      const payload = {
        id: user._id,
        role: user.role,
        email: user.email,
      };
      const newToken = jwt.sign(payload, process.env.JWT_SECRET);
      res.redirect(`http://127.0.0.1:5173?token=${newToken}`);
    }
  );
};
