const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        console.log('It works')
        const user = await getUserByUsername(username)
        if(user==null){
            return done(null, false, { message: 'No user with that email'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, { message: 'Password incorrect' })
            }
        }catch(err){
            return done(err)
        }
    }

    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    });
}

module.exports = initialize;