import express from "express";
import logger from './src/utils/Logger';
import './src/initializers';
import RouteRequest from "./src/utils/Router";
import AppConfig from "./src/utils/AppConfig";
import EventHandler from "./src/handlers/events/Event.handler";

const app = express()
const PORT = (process.env.PORT || 3500) as number;
const HOST = process.env.SERVER_BINDING || "127.0.0.1";

const ALLOW_TOKEN = AppConfig.VERIFICATION_TOKEN;
logger.info(`Using verification token ${ALLOW_TOKEN}`)

var bodyParser = require('body-parser');
app.use(bodyParser.json());


/** 
 * INITIALIZE APPLICATION  
 **/
//@ts-ignore -- Need instance of generic event handler in order to validate incoming requests for now.
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

app.listen(PORT, HOST);
logger.info(`Running on http://${HOST}:${PORT}`);
