import cron from 'node-cron';
import ChannelUpdater from './channel_updater/UpdateChannels';
import { CRONLogger } from '../utils/Logger';

function main() {
    CRONLogger.info("Booting cron jobs...");

    // Define schedules
    const CHANNEL_UPDATE_SCHEDULE = '*/5 * * * *';  // Run every 5 minutes

    // Instantiate
    cron.schedule(CHANNEL_UPDATE_SCHEDULE, ChannelUpdater.perform);
}

main();