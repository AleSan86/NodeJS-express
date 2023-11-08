import passport from 'passport';
import jwt from 'passport-jwt';
import local from 'passport-local';
import { createHash, isValidPassword } from '../utils.js';
import { UserModel } from '../DAO/models/users.model.js';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { MailController } from '../controllers/mail.controller.js';
import { addLogger } from '../logger/logger_CUSTOM.js';
import { generateJWToken } from '../utils.js';
import dotenv from 'dotenv';
dotenv.config();

const mailController = new MailController();
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
      console.log(jwt_payload);
      return done(null, jwt_payload);
    }
    catch(e) {
      return done(e);
    }
  }))

  passport.use('login', new LocalStrategy({ usernameField: 'email',  passReqToCallback: true, }, 
    async (req, email, password, done) => {
      try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });

        if (!user) {
          console.log('Usuario no encontrado (email) ' + email);
          return done(null, false);
        }

        if (!isValidPassword( password, user.password )) {
          console.log('Contraseña incorrecta');
          return done(null, false);
        }

        const tokenUser = {
          name : `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role
        };

        const access_token = generateJWToken(tokenUser);
        console.log(access_token);

        //Con Cookie
        // res.cookie('claveSecreta123', access_token, {
        //     maxAge: 120000,
        //     httpOnly: true
        // });

        return done(null, user);

      } catch (err) {
        req.logger.info();
        return done(err);
      }
    })
  );

  passport.use('register', new LocalStrategy({ usernameField: 'email', passReqToCallback: true, },
   async (req, username, password, done) => {

        try {
          const { email, firstName, lastName } = req.body;
          let user = await UserModel.findOne({ email: username });

          if (user) {
            //return done(null, false)
            return done('Ya existe un usuario registrado con esta dirección de correo: ' + email, false);
          }

          const newUser = {
            email,
            firstName,
            lastName,
            isAdmin: false,
            password: createHash(password),
          };

          if(email == process.env.MAILING_USER && password == "adminCod3r123"){
            newUser.role = "admin"
         }
         
         let userCreated = await UserModel.create(newUser);
         mailController.sendMail(newUser);

         //return done(null, userCreated)
         return done('Registro de usuario exitoso ' + userCreated);

        } catch (e) {
          return done('Error al intentar registrar');
        }
      }
    )
  );

  //GIT
  passport.use('auth-github', new GitHubStrategy({
    clientID: '6c72dcdeb537b1b8f56d',
    clientSecret: '41eb2aad2e652b5434c77ee3e51bd1cdd186d986',
    callbackURL: "http://localhost:8080/auth/github/callback"
    }, 
    async (accessToken, refreshToken, profile, done) => {
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