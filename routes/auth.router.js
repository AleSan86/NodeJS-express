import express from 'express';
import { isAdmin, isUser } from '../middlewares/auth.js';
import passport from 'passport';
import { Router } from "express";
//import { passportCall, authorization } from '../config/passport.config.js';

export const authRouter = express.Router();
export const routerGitHub = new Router()

//GIT
authRouter.get('/github',
  passport.authenticate('auth-github', { scope: ['user:email'], session: true }));

authRouter.get('/github/callback',
  passport.authenticate('auth-github', { scope: ['user:email'], session: true }),
  function (req, res) {
      //Guarda en la session los datos del user 
   //GUARDAR LOS MISMOS DATOS EN AMBAS ESTRATEGIAS
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isAdmin: req.user.role== "admin" ? true : false
    };
 //LUEGO DE REDIRIGIRLO A ESTA RUTA 
    return res.redirect('/auth/profile')
 
  });

//GET Register
authRouter.get('/register', (req, res) => {
  return res.render('register', {});
});

//POST Register
authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }),
 (req, res) => {
  if (!req.user) {
    return res.json({ error: 'Error' });
  }
   //Guarda en la session los datos del user 
   //GUARDAR LOS MISMOS DATOS EN AMBAS ESTRATEGIAS
  req.session.user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    password: req.user.password,
    age: req.user.age,
    isAdmin: req.user.role== "admin" ? true : false
  };

  //LUEGO DE REDIRIGIRLO A ESTA RUTA 
  return res.redirect('/auth/profile')

});

authRouter.get('/failregister', async (req, res) => {
  return res.json({ error: 'Hubo un fallo en el registro' });
});

//GET Login
authRouter.get('/login', (req, res) => {
  return res.render('login', {});
});

//POST Login
authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }),
async (req, res) => {
  const { username, password } = req.body;

  try {
       //Guarda en la session los datos del user 
   //GUARDAR LOS MISMOS DATOS EN AMBAS ESTRATEGIAS
      req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isAdmin: req.user.role== "admin" ? true : false
    };
  
 //LUEGO DE REDIRIGIRLO A ESTA RUTA 
    return res.redirect('/auth/profile')

  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
})

authRouter.get('/faillogin', async (req, res) => {
  return res.json({ error: 'Fallo en login' });
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'Error al cerrar session' });
    }
    return res.redirect('/auth/login');
  });
});

 // Cambiar la ruta   a /profile y luego de iniciar sesion o registrarse redirigirlo a este endpoint
authRouter.get('/profile', isUser, (req, res) => {
  const user = req.session.user;
  return res.render('profile', { user: user });
});

authRouter.get('/administracion', isUser, isAdmin, (req, res) => {
  return res.send('Admin OK');
});


//HECHO EN CLASE

// authRouter.post('/login', (req, res) => {
//   if(req.body.username == 'alesan86@gmail.com' && req.body.password == '123456'){
//       let token = jwt.sign(
//           {email: req.body.username, password: req.body.password, role: 'admin'},
//           'coderSecret',
//           {expiresIn: '24h'}
//       )
//       res.cookie('cookieToken', token, {maxAge: 60*60*1000})
//       .send({message: "Token generado con éxito"})
//   }
// })

// authRouter.get('/home', passportCall('jwt'), authorization('user'), (req, res) => {
//   res.send(req.user)
// })

// authRouter.get('/session', (req, res) => {
//   return res.send(JSON.stringify(req.session));
// });