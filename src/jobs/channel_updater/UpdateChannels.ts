import CRONJob from "../CRONJobClass";
import { CRONLogger } from "../../utils/Logger";

export default class ChannelUpdater extends CRONJob {
    constructor() { super(); }

    public static perform(): void {
        CRONLogger.info("Start refreshing list of channels.");
    }
}