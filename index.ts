import express from "express";
import EventHandler from "./utils/EventHandler";
const config = require('./config.json');

const app = express()

var bodyParser = require('body-parser');

const port = 3500;
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
		logger.info(req.body);
		res.sendStatus(403)
	}
});

app.listen(port, () => logger.info(`Mando Bot listening on port ${port}!`))
