import express from "express";
import logger from './src/utils/Logger';
import './src/initializers';
import EventHandler from "./src/handlers/EventHandler";
import RouteRequest from "./src/utils/Router";
import User from './src/models/User/User.model';
const config = require('./src/config/config.json');

const app = express()
const port = 3500;

const ALLOW_TOKEN = config.slack.verification_token || process.env.MANDO_SLACK_TOKEN;

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
		logger.debug(JSON.stringify(req.body));

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

app.listen(port, () => {
	logger.info(`Mando Bot listening on port ${port}!`);
	// let u = new User(
	// 	{
	// 		first_name: "test", last_name: "last_name", gender: "Male",
	// 		date_of_birth: new Date(), email: "a@b.com", slack_id: "2"
	// 	}
	// );
	// u.save((err, temp) => {
	// 	if(err) {logger.error(err)}
	// 	logger.info("Created new user")
	// });
});
