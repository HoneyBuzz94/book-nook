const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByUsername(username);
    if (user == null) {
      return done(null, false, { message: "No account with that username" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Username and password do not match" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      if (!user) {
        return done(new Error('User not found'));
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });
}

module.exports = initialize;
