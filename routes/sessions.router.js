import express from 'express';
import passport from 'passport';
import  SessionController  from '../controllers/session.controller.js';

export const sessionsRouter = express.Router();
export const sessionController = new SessionController()

sessionsRouter.post('/sessionGet', sessionController.getSession);
sessionsRouter.get('/sessionSet', sessionController.setSession);

sessionsRouter.get('/github', 
  passport.authenticate('github', { scope: ['user:email'], session: false }));

sessionsRouter.get('/githubcallback', 
  passport.authenticate('github', { scope: [ 'user:email' ], session: false }), 
  (req, res) => {req.session.user = req.user;
  req.session.user = req.user;
  res.redirect('/');
});

sessionsRouter.get('/show', (req, res) => {
  return res.send(JSON.stringify(req.session));
});

