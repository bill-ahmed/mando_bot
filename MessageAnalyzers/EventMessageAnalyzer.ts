import logger from '../utils/Logger';
import * as Greetings from '../models/AppMentions/Greetings';
import MessageAnalyzer from './MessageAnalyzerInterface';

/**List of hello greetings the bot CAN RECIEVE. */
const HelloGreetings = Greetings.HelloGreetings;

/**
 * Very basic example of a message analyzer. Replace with appropriate class.
 * */
export default class EventMessageAnalyzer implements MessageAnalyzer{

    /**
     * Given a message of the event type, return the type of message this is
     */
    public analyzeMessage(message: string): string {
        var result;
        var msg = message.toLowerCase();

        if(msg === "help") { result = "help" }
        else if(HelloGreetings.includes(msg)) { result = "greeting" }   // For stuff like "hello" and others, there are many possible variants
        else { result = "" }

        return result;
    }
}