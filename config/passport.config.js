import passport from 'passport';
import jwt from 'passport-jwt';
import local from 'passport-local';
import { createHash, isValidPassword } from '../utils.js';
import { UserModel } from '../DAO/models/users.model.js';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
dotenv.config();

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const cookieExtractor = req => {
  let token = null;
  if(req && req.cookies){
    token = req.cookies['coderCookieToken']
  }
  return token;
}

export function initializePassport() {

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: 'coderSecret',
    }, async(jwt_payload, done) => {
    try{
      return done(null, jwt_payload);
    }
    catch(e) {
      return done(e);
    }
  }))

  passport.use( 'login', new LocalStrategy({ usernameField: 'email' }, 
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
          console.log('Usuario no encontrado (email) ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          console.log('Contraseña incorrecta');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email',
      }, async (req, username, password, done) => {
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
  passport.use('auth-github', new GitHubStrategy({
    clientID: '6c72dcdeb537b1b8f56d',
    clientSecret: '41eb2aad2e652b5434c77ee3e51bd1cdd186d986',
    callbackURL: "http://localhost:8080/auth/github/callback"
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile)
        let user = await UserModel.findOne({email:profile._json.email})
        if(!user){
          let newUser = {
            firstName:profile._json.name,
            lastName:'Sandrin',
            age:37,
            email:profile._json.email,
            password:''
          }
          let result = await UserModel.create(newUser);
          done(null, result);
        }
        else {
          done(null, user)
        }
      }
      catch(e) {
        return done(e);
      }
    }
))
}

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