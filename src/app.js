const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Surojit Saha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Surojit Saha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help page',
        title: 'Help',
        name: 'Surojit Saha'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            res.send({
                error: error
            })
        }
        else{
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    res.send({
                        error: error
                    })
                }
                res.send({
                    address: location,
                    forecast: forecastData
                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Surojit Saha',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Surojit Saha',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})