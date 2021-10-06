const bcrypt = require('bcrypt-nodejs')

module.exports = (passport, User) => {

    const LocalStrategy = require('passport-local').Strategy

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        async (req, email, password, done) => {

            const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)

            const results = await User.findOne({
                where: {
                    email
                }
            })

            if (results) return done(null, false, { message: 'Cet email est déjà pris' })

            else {

                const data = {
                    email,
                    password: generateHash(password),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    birthdate: new Date()
                }

                const newUser = await User.create(data)

                if (!newUser) return done(null, false)
                else return done(null, newUser)
            }

        }
    ))

    passport.serializeUser((User, done) => {
        done(null, User.id)
    })

    passport.deserializeUser((id, done) => {
 
        User.findById(id).then((user) => {
     
            if (user) done(null, user.get())
            else done(user.errors, null)
     
        })
     
    })
}