var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser')
    cors = require('cors'),
    fetcher = require('./fetch')


app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.route('/getData')
    .post((req, res) => {
        fetcher.getFrequency().then((data) => {
            var array = data.slice(0, req.body.number) 
            res.send({
                "status":"success",
                "data": array
            })
        })
    })

app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('Api is running on: ' + port)