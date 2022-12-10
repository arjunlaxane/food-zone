const express = require('express');
const dotenv = require('dotenv');
const app = express();
const connectDatabase = require('./database');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
var cloudinary = require('cloudinary').v2;
const cors = require('cors');

//console.log(youtube)-->uncaught errors

//handling uncaught exception
process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);

  process.exit(1);
});

dotenv.config({ path: '.env' });

//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDatabase();

app.use(fileUpload({ useTempFiles: true }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

//route imports
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');

app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoute);

//middleware for error

app.use(errorMiddleware);

const PORT = process.env.PORT || 4006;

const server = app.listen(PORT, () => {
  console.log(`Server has started on  http://localhost:${PORT}`);
});

//unhandled promise rejection --to shut down server

// err MongoParseError: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"

process.on('unhandledRejection', err => {
  console.log(`Error : ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejection');

  server.close(() => {
    process.exit(1);
  });
});
