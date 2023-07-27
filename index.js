import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { usersRouter } from './routes/users.router.js';
import { productsRouter } from './routes/products.router.js';
import { connectMongo } from './DAO/db.js';
import { authRouter } from './routes/auth.router.js';
import { iniPassport } from './config/passport.config.js';
//import { initializePassport, passportCall }  from './config/passport.config.js'
import { sessionsRouter } from './routes/sessions.router.js';
import { viewsRouter } from './routes/views.router.js';
import { usersViewRouter } from './routes/users.view.js';
import { productsViewRouter } from './routes/products.view.js';
import { __dirname} from './utils.js';

connectMongo();

const app = express();

const port = 8080;
app.listen(port, () => {
    console.log(`App corriendo en http://localhost:${port}`);
});

//CONFIG EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
  secret:'claveSecreta123',
    resave:true,
    saveUninitialized:true
}))

//PASSPORT
app.use(passport.initialize());
app.use(passport.session())
iniPassport();
// app.use(passport.initialize())
// initializePassport()

//Config Views
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

//CONFIG RUTAS
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/users', usersViewRouter);
app.use('/products', productsViewRouter);
app.use('/auth', authRouter);

//Session
app.get('/sessionSet', (req, res) => {
  req.session.username = 'alesan86@gmail.com'
  req.session.password = 123456
  res.send('Sesión creada con éxito')
})

app.get('/sessionGet', (req, res) => {
  res.send(req.session)
})

app.get('/logout', (req, res) => {
  req.session.destroy(e => {
      if(e) res.send('Fallo ejecutando Logout')
      res.send('Sesión cerrada con éxito')
  })
})

//404 Default
app.get('*', (_, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'no encontrado',
    data: {},
  });
});