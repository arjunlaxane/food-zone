//mongodb connection

const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const connectDatabase = async () => {
  // mongoose
  //   .connect(process.env.DB_URL)
  //   .then(data => {
  //     console.log(`Mongo db connected with server ${data.connection.host}`);
  //   })
  //   .catch(err => {
  //     console.log('err', err);
  //   });

  ///removed catch as we have handled unhandle promise rejection

  const data = await mongoose.connect(process.env.DB_URL);
  console.log(`Mongo db connected with server ${data.connection.host}`);
};

module.exports = connectDatabase;
