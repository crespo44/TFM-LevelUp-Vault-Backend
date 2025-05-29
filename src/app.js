const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const gamesRoutes = require('./routes/gameRoutes');
const fileRoutes = require('./routes/fileRoutes');
const emailRoutes = require('./routes/emailRoutes');

const errorHandler = require('./middlewares/errorMiddleware');
const notFoundHandler = require('./middlewares/notFoundHandler');

const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend')));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })); 
app.use(helmet());
app.use((req,res,next) =>{
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  next();
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const apiLimiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Demasiadas peticiones desde esta IP'
});

app.use('/', apiLimiter);
  
app.use('/users', userRoutes);     
app.use('/games', gamesRoutes);
app.use('/multer/files', fileRoutes);
app.use('/email', emailRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;