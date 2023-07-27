import express from 'express';
import { isAdmin, isUser } from '../middlewares/auth.js';
import passport from 'passport';
import { Router } from "express";
import jwt from 'jsonwebtoken';
//import { passportCall, authorization } from '../config/passport.config.js';

export const authRouter = express.Router();
export const routerGitHub = new Router()

//GIT
authRouter.get('/github',
  passport.authenticate('auth-github', { scope: [ 'user:email' ], session: false }));

  authRouter.get('/github/callback', 
passport.authenticate('auth-github', { scope: [ 'user:email' ], session: false }),
function(req, res) {
// Successful authentication, redirect home.
//res.redirect('/');
res.send(JSON.stringify(req.user))
});

authRouter.get('/register', (req, res) => {
  return res.render('register', {});
});

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {
  if (!req.user) {
    return res.json({ error: 'Error' });
  }
  req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };

  return res.json({ msg: 'ok', payload: req.user });
 // return res.redirect('/');
});

authRouter.get('/failregister', async (req, res) => {
  return res.json({ error: 'Hubo un fallo en el registro' });
});

authRouter.get('/login', (req, res) => {
  return res.render('login', {});
});

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = await userModel.findOne({ username });

      if (user && user.password === password) {
          req.session.firstName = user.firstName;
          req.session.email = user.email;
          req.session.admin = false;
          if (
            user.username === "alesan86@gmail.com" &&
            user.password === "123456"
          ) {
            req.session.admin = true;
          }
      return res.redirect('/profile')
  } else {
      return res.status(400).json({ message: "Invalid credentials" });
  }
  } catch (e) {
      console.log(e);
      return res.status(500).json({ message: error.message });
    }
})

// authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
//   if (!req.user) {
//     return res.json({ error: 'Credenciales inválidas' });
//   }
//   req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };
// console.log(req.session.user)
//   return res.json({ msg: 'ok', payload: req.user });
// });

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

authRouter.get('/perfil', isUser, (req, res) => {
  const user = req.session.user;
  return res.render('perfil', { user: user });
});

authRouter.get('/administracion', isUser, isAdmin, (req, res) => {
  return res.send('Admin OK');
});





//HECHO EN CLASE (NO FUNCIONA)

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