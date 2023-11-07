import express from 'express';

import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import helmet from 'helmet';
import morgan from 'morgan';
import env from 'dotenv';

import homeRoutes from './routes/home.js';
import authRoutes from './routes/auth.js';
import aboutRoutes from './routes/about.js';
import dashboardRoutes from './routes/dashboard.js';

import { configPassport } from './config/passport.js';
import errorController from './controllers/errorController.js';

env.config();

const app = express();
const PORT = process.env.PORT || 5000;
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
});

app.use(helmet());
app.use(morgan('dev'));

app.use(
  session({
    store,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: Date.now() - 7 * 24 * 60 * 60 * 1000 },
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(expressLayouts);

app.use(methodOverride('_method'));

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

configPassport();

app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/about', aboutRoutes);
app.use('/dashboard', dashboardRoutes);

app.use('*', errorController.getNotFoundPage);

app.use(errorController.getErrorPage);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MONGO connection success!');

    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log('ERROR: ', error);
    process.exit(1);
  }
})();
