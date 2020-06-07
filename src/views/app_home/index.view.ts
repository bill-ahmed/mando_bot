const APP_HOME_VIEW = {
	"blocks": [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hey there! This is an example tempalte for the app home page. Checkout the block kit builder at to get started."
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Open Builder",
					"emoji": true
				},
				"value": "https://app.slack.com/block-kit-builder."
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "datepicker",
					"initial_date": "1990-04-28",
					"placeholder": {
						"type": "plain_text",
						"text": "Select a date",
						"emoji": true
					}
				},
				{
					"type": "datepicker",
					"initial_date": "1990-04-28",
					"placeholder": {
						"type": "plain_text",
						"text": "Select a date",
						"emoji": true
					}
				}
			]
		},
		{
			"type": "divider"
		}
	]
}

export default APP_HOME_VIEW;