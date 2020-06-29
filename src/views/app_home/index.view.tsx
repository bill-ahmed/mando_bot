/** @jsx JSXSlack.h */
import JSXSlack, { Home, Section, Divider, Button, Actions, DatePicker } from '@speee-js/jsx-slack';

/** Information regarding where this block is used.
 * For more info: https://api.slack.com/reference/surfaces/views
 */
export default function HomeTab(props?: any) {
	return JSXSlack(
        <Home>
            <Divider/>
            <Section>
                <p>
                    Hey there! This is an example template for the app home page. Checkout the block kit builder to get started.
                </p>
                <Button style="primary" value="click_me" url="https://app.slack.com/block-kit-builder">
                    Open Builder
                </Button>
            </Section>
            <Section>
                <p> For a more high-level and better development experience, checkout the jsx-slack repo. </p>
                <Button style="primary" value="click_me" url="https://github.com/speee/jsx-slack">
                    JSX-Slack
                </Button>
            </Section>
            <Actions>
                <DatePicker initialDate="1990-04-28"/>
                <DatePicker initialDate={ new Date() }/>
            </Actions>
            <Divider/>
        </Home>
	);
}
