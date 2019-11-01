const express = require('express');
const app = express();
const mongoose = require('mongoose');
const con = require('./config/keys').MONGO_URI;
const PORT = process.env.PORT || 5000;
const subscriberRouter = require('./routes/subcribers');

//Middleware
app.use(express.json());

//Connecting Database
mongoose
  .connect(con, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected ...'))
  .catch(err => console.error(err));

// const db = mongoose.connection;
// db.on('error', err => console.error(err));
// db.once('open', () => console.log('MongoDB Connected ...'));

//Use Subscriber routes
app.use('/subscribers', subscriberRouter);

//Listening to PORT
app.listen(PORT, () => console.log(`Server Started on PORT ${PORT} ...`));
