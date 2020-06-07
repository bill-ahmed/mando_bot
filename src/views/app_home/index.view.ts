/** Information regarding where this block is used.
 * For more info: https://api.slack.com/reference/surfaces/views
 */
const _meta = {
	"type": "home",
	"title": {
		"type": "plain_text",
		"text": "GENERIC TITLE"
	}
}

/** View to render */
const view_blocks = {
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
				"value": "click_me",
				"url": "https://app.slack.com/block-kit-builder",
				"style": "primary"
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

const APP_HOME_VIEW = {
	..._meta,
	...view_blocks
}

export default APP_HOME_VIEW;
