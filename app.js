require('./config/config')


const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');


const appRoutes = require('./routes/app')
const loginRoutes = require('./routes/login')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/', appRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server: '.blue.bold, 'PORT'.blue, '['.bold, colors.green(process.env.PORT), ']'.bold);
});