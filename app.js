const dotenv          = require('dotenv').config()
const http            = require('http');
const express         = require('express');
const path            = require('path');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser')
const mongoose        = require('mongoose');
const helmet          = require('helmet')
const session         = require('express-session')
const app             = express();
app.locals            = require('./config')

//                       Global functions 
ucfirst               = (string) => {return string.charAt(0).toUpperCase() + string.slice(1)}

//mongoose.connect('mongodb://localhost/sickdev', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'tH!$_!$_mY_$3$$!0n_$3cR3T',
  resave: true,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({ extended: false}))

app.use('/api',         require('./api/routes'));

/*
app.use('/',            require('./routes/indexRouter'));
app.use('/',            require('./routes/staticRouter'));
app.use('/',            require('./routes/authRouter'));
app.use('/manage',      require('./routes/manage'));
app.use('/user',        require('./routes/user'));
app.use('/post',        require('./routes/post'));
app.use('/jokes',       require('./routes/jokes'));
app.use('/memes',       require('./routes/memes'));
app.use('/account',     require('./routes/account'));
app.use('/action',      require('./routes/action'));
app.use('/messages',    require('./routes/messages'));
*/

app.use(function(req, res) {
  res.status(404).send('Not found');
});

if(process.env.API === 'true'){
  var port = process.env.API_PORT
} else {
  var port = process.env.PORT
}
 app.listen(port, function(){
  console.log(`Listening on ${port}...`);
 })