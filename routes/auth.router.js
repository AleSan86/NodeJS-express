import express from 'express';
import { authorization, isAdmin, isUser } from '../middlewares/auth.js';
import passport from 'passport';
import { Router } from "express";
import { uploader } from "../utils.js";
 
export const authRouter = express.Router();
export const routerGitHub = new Router()

//GIT
authRouter.get('/github', passport.authenticate('auth-github', { scope: ['user:email'], session: true }));

authRouter.get('/github/callback', passport.authenticate('auth-github', { scope: ['user:email'], session: true }),
  function (req, res) {
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isAdmin: req.user.role == "admin" ? true : false
    };
    return res.redirect('/auth/profile', {profile})
  }
);

authRouter.get('/register', (req, res) => {
  return res.render('register', {});
});

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }),
 (req, res) => {

  if (!req.user || !req.email) {
    return res.json({ error: 'Debe ingresar datos válidos.' });
  }

  req.session.user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    password: req.user.password,
    age: req.user.age,
    isAdmin: req.user.role == "admin" ? true : false
  };

  return res.redirect('/auth/login')
});

authRouter.get('/failregister', async (req, res) => {
  return res.json({ 
    error: 'Hubo un fallo en el registro, revise los campos obligatorios'
  });
});

authRouter.get('/login', (req, res) => {
  return res.render('login', {});
});

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }),
async (req, res) => {

  const { email, password } = req.body;

  try {
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isAdmin: req.user.role == "admin" ? true : false
    };

    if(req.session.user.isAdmin == true) {
      req.user.role = "admin";
      req.session.role = "admin";
      return res.redirect('/auth/profileAdmin')
    }
  
    return res.redirect('/auth/profile')

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
})

authRouter.get('/faillogin', async (req, res) => {
  return res.json({ error: 'Fallo al intentar loguear, revise los campos' });
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'Error desconocido al cerrar session' });
    }
    return res.redirect('/auth/login');
  });
});

authRouter.get('/profile', isUser, (req, res) => {
  const user = req.session.user;
  if(!user) {
    return res.status(401).render('error', { error: 'Debe iniciar sesión para ver esta vista' });
  }
  return res.render('profile', { user: user });
});

authRouter.post('/profileAdmin', uploader.single('file'), isUser, (req, res) => {
  const user = req.session.user;
  if(!user) {
    return res.status(401).render('error', { error: 'Debe iniciar sesión para ver esta vista' });
  }
  else {
    if (!request.file) {
      return response.status(400).send({ status: "error", mensaje: "No se adjunto archivo." });
    }
    console.log(request.file);
    user.image = request.file.path
  }
});

authRouter.get('/profileAdmin', isUser, isAdmin, (req, res) => {
  const user = req.session.user;
  if(!user) {
    return res.status(401).render('error', { error: 'Debe iniciar sesión para ver esta vista' });
  }
  console.log("Admin Ok");
  return res.render('profileAdmin', { user: user });
});