import express from 'express';

export const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
  res.render('login');
});

viewsRouter.get('/register', async (req, res) => {
  res.render('register');
});