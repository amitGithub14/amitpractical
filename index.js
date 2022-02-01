const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001;
const mongoose = require('mongoose');
const userRouter = require('./routes/api/userRouter.js');
app.use(cors());

const dbRoute =
  'mongodb+srv://amitpractical:onhostdose17@cluster0.t4smy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('database connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`server started at ${PORT}`));
