//----------------__DIRNAME------------------------------
import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//----------------bcrypt------------------------------
import bcrypt from 'bcrypt';
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashpassword) => bcrypt.compareSync(password, hashpassword);

//----------------MULTER------------------------------
import multer from 'multer';

const storage = multer.diskStorage({
    //Destino de archivo
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  //Nombre con el que quiero que se guarde el archivo
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({
  storage,
  //Si se genera algún error, lo capturamos
  onError: function (err, next) {
    console.log(err);
    next();
  }
});

//-------------------------------------------------------
import passport from 'passport';
import jwt from 'jsonwebtoken';

export const PRIVATE_KEY = "Secret";

export const generateJWToken = (user) => {
  return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '1200s'}); //-->Token generado con duracion en segundos.
};

export const passportCall = (strategy) => {
  return async(req, res, next) => {
    passport.authenticate(strategy, function(err, user, info) {
      if(err) next(err);
      if(!user) {res.status(401).send({error:info.messages?info.messages:info.toString()});
    }
    req.user = user;
    console.log(user);
    next();
    })(req, res, next);
  }
}