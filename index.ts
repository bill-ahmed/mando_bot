import express from "express";
import logger from './src/utils/Logger';
import './src/initializers';
import EventHandler from "./src/handlers/events/app_mentions/Events.handler";
import RouteRequest from "./src/utils/Router";
import AppConfig from "./src/utils/AppConfig";

const app = express()
const port = 3500;

const ALLOW_TOKEN = AppConfig.VERIFICATION_TOKEN;

var bodyParser = require('body-parser');
app.use(bodyParser.json());


/** 
 * INITIALIZE APPLICATION  
 **/

const ev = new EventHandler();

/**Validate all incoming requests before continuing */
app.post('*', (req, res) => {

	// If valid token provided
	if(req.body.token && req.body.token === ALLOW_TOKEN){
		logger.debug("request body" + JSON.stringify(req.body));

		if(req.body.type === 'url_verification'){
			ev.validateRequestURL(req, res);
			logger.info("Validated new request URL!")
			return;
		}

		res.sendStatus(200);
		RouteRequest(req.body.event.type, req, res);
		
	} else {
		logger.warn(`Unauthenticated request from ${req.ip} with\nHeaders:\n${JSON.stringify(req.headers, null, 2)}\n\nBody:\n${JSON.stringify(req.body, null, 2)}`);
		res.sendStatus(403)
	}
});

app.listen(port, async () => {
	logger.info(`Mando Bot listening on port ${port}!`);
});
