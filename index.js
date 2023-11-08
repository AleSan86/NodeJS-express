import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser'
import session from 'express-session'
import bodyParser from 'body-parser';

//DB
//import { connectMongo } from './DAO/db.js';
import MongoSingleton from './config/singletonMongoDB.js';
import { initializePassport } from './config/passport.config.js';

//Routes
import { usersRouter } from './routes/users.router.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { authRouter } from './routes/auth.router.js';
import { sessionsRouter } from './routes/sessions.router.js';
import { testRouter } from './routes/test.router.js';
import { mailRouter } from './routes/mail.router.js';

//Views
import { viewsRouter } from './routes/views.router.js';
import { usersViewRouter } from './routes/users.view.js';
import { productsViewRouter } from './routes/products.view.js';

import { __dirname} from './utils.js';

//Winston Logger
import { addLogger } from './logger/logger_CUSTOM.js';
//import { addLogger } from './logger/logger.js';

//connectMongo();

//Swagger
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';
const swaggerOptions = {
  definition: {
      openapi: "3.0.1",
      info: {
          title: "Documentacion API",
          description: "Testing de documentacion a través de Swagger"
      }
  },
  apis: [`./docs/**/*.yaml`]
};
const specs = swaggerJSDoc(swaggerOptions);

//Test de Mock
import { mocksRouter } from './routes/mocks.router.js';

const app = express();

const port = 8080;
app.listen(port, () => {
    console.log(`App corriendo en http://localhost:${port}`);
});

//Config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

//Session
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret:'claveSecreta123',
  resave:false,
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
}))

//Logger
app.use(addLogger);
app.get('/logger', (req, res) => {
  //req.logger.warn("Prueba de log level warn!");
  res.send("Prueba de logger")
})

//Passport
app.use(passport.initialize());
app.use(passport.session())
initializePassport();

//Views
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

//Config routes
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);
app.use('/users', usersViewRouter);
app.use('/products', productsViewRouter);
app.use('/auth', authRouter);
app.use("/api/test", testRouter);
app.use('/api/mock', mocksRouter);
app.use('/mail', mailRouter);
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));


app.get('/sessionSet', (req, res) => {
  req.session.email = 'alejandrosandrin@gmail.com'
  req.session.password = 'cod3rAdmin',
  req.session.role = "admin",
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

//Testing Singleton
const mongoInstance = async () => {
  try {
      await MongoSingleton.getInstance();
  } catch (error) {
      console.error(error);
      process.exit();
  }
};
mongoInstance();

//404 Default
app.get('*', (_, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'no encontrado',
    data: {},
  });
});