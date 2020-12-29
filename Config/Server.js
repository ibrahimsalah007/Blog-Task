const express = require('express');
const Path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

const KEYS = require('./Keys');


//Server configuration
app.set('trust proxy', true) // trust first proxy
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(Path.join(__dirname, '../Client/dist/task1')));

//configure and run and mongodb
mongoose.connect(KEYS.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => {
        console.log('Database Running');
        //run and listen to {PORT}
        app.listen(KEYS.PORT, () => console.log(`Server Running on Port ${KEYS.PORT}`));
    })
    .catch(err => console.log(`Mongodb error: ${err.message}`));

module.exports = app;