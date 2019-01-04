const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine','hbs');
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  var log = `${new Date().toString()}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err) {
      console.log('Unable to append log');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('Hello Express!');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    pageContent: 'Welcome to the Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    type: 'Error',
    message: 'Something went wrong!'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
