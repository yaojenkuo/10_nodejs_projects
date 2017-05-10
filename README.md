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