const express = require('express'); //first require express package just installed
const bodyParser = require('body-parser');
const request = require('request');
const app = express() //create instance named app by invoking express

const apiKey = '56661193bee69cf5d54c5e3e4c090131';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs')

app.get('/', function (req, res) { //app.get('/'.. means the focus is on the root URL (/)
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} fuckin degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () { //we are creating a server listening on port 3000 for connections
  console.log('Weather-Octopod listening on port 3000!')
})
