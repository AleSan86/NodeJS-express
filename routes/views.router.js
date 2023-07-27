import express from 'express';
export const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
  console.log("home");
  res.render('main');
});

viewsRouter.get('/login', async (req, res) => {
  res.render('login');
});