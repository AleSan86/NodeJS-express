import express from 'express';
import passport from 'passport';

export const sessionsRouter = express.Router();

sessionsRouter.get('/github', 
  passport.authenticate('github', { scope: ['user:email'], session: false }));

sessionsRouter.get('/githubcallback', 
  passport.authenticate('github', { scope: [ 'user:email' ], session: false }), 
  (req, res) => {req.session.user = req.user;
  // Successful authentication, redirect home.
  req.session.user = req.user;
  res.redirect('/');
});

sessionsRouter.get('/show', (req, res) => {
  return res.send(JSON.stringify(req.session));
});