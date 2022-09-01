const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async (req, email, password, done) => {

        const user = await User.findOne({ email: email })

        if (user) {
            return done(null, false, req.flash('signupMessage', 'El email ya existe en la base de datos'))
        } else {
            const newUser = new User();
            newUser.username = req.body.username;
            newUser.email = email;
            newUser.password = newUser.encryptedPassword(password);
            await newUser.save();
            done(null, newUser);
        }
    }
))

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    
    if(!user || !user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage', 'Credenciales no válidas'))
    }
    done(null, user)
}))