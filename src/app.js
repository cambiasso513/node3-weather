const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const weatherforecast = require('./utils/weatherforecast');

// app.com

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
// partials for header & footer
const partialPath=path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
//register partials
hbs.registerPartials(partialPath);


//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


 app.get('', (req, res) => {
     res.render('index', {
         title: 'weather app',
         name: 'Calvin'
     })
 });

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'calvin',
        title: 'help',
        helptext: 'This is a help text.'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Calvin'
    })
});

// get weather data


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must enter an address'
        })
    }
    const address = req.query.address;
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        weatherforecast(longitude, latitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location: location,
                address: req.query.address
            });
        });
    });

});



app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
});



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Calvin',
        errorText: 'Help page not found'
    })
});

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Calvin',
        errorText: 'About page not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Calvin',
        errorText: 'Page not found'
    })
});


app.listen(3000, () => {
    console.log('Server is up on port 3000')
});




// app.com
// app.com/help
// app.com/about
