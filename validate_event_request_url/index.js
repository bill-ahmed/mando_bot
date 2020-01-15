const express = require('express')
const app = express()
const port = 3200

var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/slack/events', (req, res) => {
    console.log(req.body);
    res.send(req.body.challenge)
});

app.listen(port, () => console.log(`Validating event subscriptions on port ${port}!`))