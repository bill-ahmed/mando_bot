import express from "express";
import EventHandler from "./helpers/EventHandler";
const config = require('./config.json');

const app = express()
var bodyParser = require('body-parser')

const port = 3500
const ALLOW_TOKEN = config.slack.slack_token;
const rq = new EventHandler();

app.use(bodyParser.json());

/**Validate all incoming requests before continuing */
app.post('*', (req, res) => {
	// If valid token provided
	if(req.body.token && req.body.token === ALLOW_TOKEN){
		
        res.sendStatus(200);

		switch (req.body.event.type) {
			case "url_verification":
				rq.validateRequestURL(req, res);
				break;
		
			case "app_mention":
				rq.appMention(req, res);
				break;

			default:
				break;
		}
		
	} else {
		console.error(req.body);
		res.sendStatus(403)
	}
});

/**Events endpoint validation*/
// app.post('/slack/events', (req: any, res: any) => {
// 	if(req.body.token === ALLOW_TOKEN){
// 		console.log("Good request.", req.body);
// 		res.sendStatus(200);
// 	} else {
// 		console.error("Error: Invalid token recieved");
// 	}
// });

app.listen(port, () => console.log(`Mando Bot listening on port ${port}!`))
