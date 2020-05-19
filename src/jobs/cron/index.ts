import cron from 'node-cron';
import ChannelUpdater from '../channel_updater/UpdateChannels';
import { JobLogger } from '../../utils/Logger';
import CRONJob, { InvalidScheduleError, JobAlreadyExistsError, JobNotFoundError } from './BackgroundJobClass';

interface ScheduledJob { id: string, task: cron.ScheduledTask }

class JobManager {
    private jobs: ScheduledJob[] = [];

    constructor() { }

    /** Schedule a job with given CRON schedule.
     * @param schedule A valid CRON schedule
     * @param klass The CRONJob class to execute
     * @param args Any argument to pass in to the perform() method of your class.
     * @throws InvalidScheduleError, JobAlreadyExistsError
     */
    public schedule_job(id: string, schedule: string, klass: CRONJob, ...args: any): void {
        if(!cron.validate(schedule)) { throw new InvalidScheduleError(schedule) }
        
        // If job with given id already exists, then we can't add it
        this.jobs.forEach(job => { if(job.id === id) { throw new JobAlreadyExistsError(id) } })

        this.jobs.push(
            {
                id: id,
                task: cron.schedule(schedule, klass.perform)
            }
        );

        JobLogger.info(`Scheduled job ${klass.constructor.name} with args: ${args}`)
    }

    /** Remove a job with given id 
     * @param id The ID of the job to stop.
     * @throws JobNotFoundError
    */
    public remove_job(id: string): void {
        let job: ScheduledJob;
        
        for(let i = 0; i < this.jobs.length; i++) {
            if((job = this.jobs[i]).id === id) {
                job.task.destroy();
                this.jobs.splice(i, 1);
                return;
            }
        }

        throw new JobNotFoundError(id);
    }
}

function main() {
    JobLogger.info("Booting cron jobs...");
    let job_manager = new JobManager();

    // Define schedules
    const CHANNEL_UPDATE_SCHEDULE = '*/5 * * * *';  // Run every 5 minutes

    // Instantiate
    job_manager.schedule_job("UPDATE_LIST_OF_CHANNELS", CHANNEL_UPDATE_SCHEDULE, new ChannelUpdater());
}

main();