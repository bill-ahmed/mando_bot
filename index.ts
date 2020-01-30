import express from "express";
import logger from './utils/Logger';
import EventHandler from "./utils/EventHandler";
const config = require('./config.json');

const app = express()
const port = 3500;
const ALLOW_TOKEN = config.slack.slack_token;

var bodyParser = require('body-parser');
app.use(bodyParser.json());


const ev = new EventHandler();

/**Validate all incoming requests before continuing */
app.post('*', (req, res) => {
	// If valid token provided
	if(req.body.token && req.body.token === ALLOW_TOKEN){
		logger.info(JSON.stringify(req.body, null, 2));

		if(req.body.type === 'url_verification'){
			ev.validateRequestURL(req, res);
			logger.info("Validated new request URL!")
			return;
		}

		res.sendStatus(200);
		switch (req.body.event.type) {
			case "app_mention":
				ev.appMention(req, res);
				break;

			default:
				break;
		}
		
	} else {
		logger.warn(req.body);
		res.sendStatus(403)
	}
});

app.listen(port, () => logger.info(`Mando Bot listening on port ${port}!`))
