const config = require('./config.json');
const express = require('express')
const app = express()
var bodyParser = require('body-parser')

const port = 3500
const ALLOW_TOKEN = config.slack.slack_token;

app.use(bodyParser.json());

/**All normal POST requests through here./*
app.get('/', (req: any, res: any) => {
	if(req.body.token === ALLOW_TOKEN){
		console.log("Good request", req.body);
	} else {
		console.err("Recieved invalid token, rejecting request...");
	}
});

/**Events endpoint validation*/
app.post('/slack/events', (req: any, res: any) => {
	if(req.body.token === ALLOW_TOKEN){
		console.log("Good request.", req.body);
		res.sendStatus(200);
	} else {
		console.err("Error: Invalid token recieved");
	}
});

app.listen(port, () => console.log(`Mando Bot listening on port ${port}!`))
