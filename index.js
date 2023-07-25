import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import { usersRouter } from './routes/users.router.js';
import { productsRouter } from './routes/products.router.js';
import { connectMongo } from './DAO/db.js';

import { usersViewRouter } from './routes/users.view.js';
import { productsViewRouter } from './routes/products.view.js';
import { __dirname} from './utils.js';

connectMongo();

const app = express();
const port = 8080;
app.listen(port, () => {
    console.log(`App corriendo en http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/users', usersViewRouter);
app.use('/api/products', productsRouter);
app.use('/products', productsViewRouter);