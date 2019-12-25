const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const port = process.env.PORT || 3000
const app = express()

// Define paths for express config 
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))



app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home page',
        author: 'TvNiSp'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        author: 'TvNiSp'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author: 'TvNiSp'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: `You must provide and address`
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })

    })
})


app.listen(port, () => {
    console.log(`Serving at port number: ${port}`)
})