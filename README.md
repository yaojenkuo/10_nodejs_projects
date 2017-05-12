# 10_nodejs_projects

Learn Node.js by building 10 projects.

## simple_server

```bash
mkdir simple_server
cd simple_server
npm init
```

- Create a index.html then paste the following code:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

```bash
npm start
```

## express_website

```bash
npm install express-generator -g
express --view=pug ${project_name} # jade is depreciated to pug
cd ${project_name}
```

- add `var nodemailer = require('nodemailer');` in app.js

```bash
npm install nodemailer --save
npm install
DEBUG=${project_name}:* npm start
```

- Use [Bootstrap](http://getbootstrap.com/) for a good look
- Use [html2pug](http://html2pug.com/) to convert html to pug
- Use [Bootstrap starter template](http://getbootstrap.com/examples/starter-template/) as the template
- Revise `layout.pug`
- add `about`, `contact` routes variables in `app.js`
- add `about.js`, `contact.js` in `/routes`
- add `about.pug`, `contact.pug` in `/views`
- (**Important!**)to enable nodemailer, generate another password for external applications to replace the original 2-step authorization
- create `router.post()` in `contact.js`

## user_login_system

- Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) through [Homebrew](https://brew.sh/)

```bash
brew update
brew install mongodb
```

- Make a directory where MongoDB stores data:

```bash
mkdir ${path_name/data/db}
mongod --dbpath ${path_name/data/db}
```

- Open a new terminal:

```bash
mongo
```

- Create a new collection called users:

```bash
db.createCollection('users')
show collections
```

- Create the first user(Do not use plain text for password in production!):

```bash
db.users.insert({name: "Chandler Bing", email: "chandler@friends.com", username: "chandlerbing", password: "1234"})
db.users.insert({name: "Joey Tribbiani", email: "joey@friends.com", username: "joeytribbiani", password: "1234"})
db.users.find()
db.users.find().pretty()
```

- How to modify a record:

```bash
db.users.update({username: "joeytribbiani"}, {$set: {password: "5678"}})
db.users.find().pretty()
```

- Add additional node modules:

```javascript
// package.json
{
  "name": "node-auth",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.17.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.3",
    "express": "~4.15.2",
    "morgan": "~1.8.1",
    "pug": "~2.0.0-beta11",
    "serve-favicon": "~2.4.2",
	"mongodb":"*",
	"mongoose":"*",
	"connect-flash":"*",
	"express-validator":"*",
	"express-session":"*",
	"express-messages":"*",
	"passport":"*",
	"passport-local":"*",
	"passport-http":"*",
	"multer":"*"
  }
}
```

- Be careful on `var upload = multer({ dest: 'uploads/' });`

```javascript
// app.js
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

// Handle file uploads
var upload = multer({ dest: 'uploads/' }); // Be careful!

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle express sessions
app.use(session({
	secret:'secret',
	saveUninitialized: true,
	resave:true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Validator
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
```