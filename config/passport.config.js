import passport from 'passport';
import local from 'passport-local';
import { createHash, isValidPassword } from '../utils.js';
import { UserModel } from '../DAO/models/users.model.js';
import { Strategy as GtiHubstrategy } from 'passport-github2'
import dotenv from 'dotenv';
dotenv.config();
import GitHubStrategy from 'passport-github2';
import fetch from "node-fetch";
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
          console.log('User Not Found with username (email) ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          console.log('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { email, firstName, lastName } = req.body;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            console.log('El usuario ya existe');
            return done(null, false);
          }

          const newUser = {
            email,
            firstName,
            lastName,
            isAdmin: false,
            password: createHash(password),
          };
          let userCreated = await UserModel.create(newUser);
          console.log(userCreated);
          console.log('Registro de usuario exitoso');
          return done(null, userCreated);
        } catch (e) {
          console.log('Error al intentar registrar');
          console.log(e);
          return done(e);
        }
      }
    )
  );

  //GIT
  passport.use(
      'auth-github',
      new GtiHubstrategy(
          {
          clientID: '6c72dcdeb537b1b8f56d',
          clientSecret: '41eb2aad2e652b5434c77ee3e51bd1cdd186d986',
          callbackURL: "http://localhost:8080/auth/github/callback"
          },
          function (accessToken, refreshToken, profile, done) {
              console.log(profile)
              done(null, profile)
          }
      )
  )

  // passport.use(
  //   'github',
  //   new GitHubStrategy(
  //     {
  //       clientID: GITHUB_CLIENT_ID,
  //       clientSecret: GITHUB_CLIENT_SECRET,
  //       callbackURL: 'http://localhost:8080/auth/github/callback',
  //     },
  //     async (accesToken, _, profile, done) => {
  //       try {
  //       // Configuracion para recibir email si esta configurado en privado desde github
        
  //       const res = await fetch('https://api.github.com/user/emails', {
  //       headers: {
  //           Accept: 'application/vnd.github+json',
  //           Authorization: 'Bearer ' + accesToken,
  //           'X-Github-Api-Version': '2022-11-28',
  //       },
  //       });
  //       const emails = await res.json();
  //       const emailDetail = emails.find((email) => email.verified == true);

  //       if (!emailDetail) {
  //       return done(new Error('cannot get a valid email for this user'));
  //       }
  //       profile.email = emailDetail.email;

  //       //Fin de configuracion de email
  //       let user = await UserModel.findOne({ email: profile.email });
  //       if (!user) {
  //       const newUser = {
  //           email: profile.email,
  //           firstName: profile._json.name || profile._json.login || 'noname',
  //           lastName: 'nolast',
  //           isAdmin: false,
  //           password: 'nopass',
  //       };
  //       let userCreated = await UserModel.create(newUser);
  //       console.log('User Registration succesful');
  //       return done(null, userCreated);
  //       } else {
  //       console.log('User already exists');
  //       return done(null, user);
  //       }
  //       } catch (e) {
  //         console.log('Error en auth github');
  //         console.log(e);
  //         return done(e);
  //       }
  //     }
  //   )
  // );

  // passport.use(twitter)
  // passport.use(facebook)

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}


//Hecho en clases (NO FUNCIONA)
// import passport from 'passport';
// import  jwtstrategy   from 'passport-jwt';
// import  extractjwt   from 'passport-jwt';

// const JwtStrategy = jwtstrategy.Strategy;
// const ExtractJwt = extractjwt.ExtractJwt;

// export function initializePassport() {
//     passport.use('jwt', new JwtStrategy({
//         jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//         secretOrKey: 'coderSecret'
//     }, async (jwt_payload, done) => {
//         try{
//             return done(null, jwt_payload)
//         } catch(e){
//             return done(null, e)
//         }
//     }))
// }

// export function cookieExtractor(req) {
//     let token = null
//     if(req && req.cookie) {
//         token = req.cookie['jwt']
//     }
//     return token
// }

// export function passportCall(strategy) {
//     return (req, res, next) => {
//         passport.authenticate(strategy, function(e, info, user){
//         if(e) return next(e)
//         if(!user){
//             return res.status(401).send({e: info.message ? info.message : info.toString()})
//         }
//         req.user = user
//         next()
//         })(req, res, next)
//     }
// }

// export function authorization(role) {
//     return async (req, res, next) => {
//         if(!req.user) return res.status(401).send({e: "Unauthorized"})
//         if(req.user.role != role) return res.status(403).send({e: "Usuario sin permiso"})
//     }
// }