export default abstract class BackgroundJob {
    constructor() { }

    /** MUST OVERRIDE THIS METHOD. */
    public abstract async perform(args?: any): Promise<any>;
}

export class JobError extends Error {
    constructor() { super(); }
}

export class JobAlreadyExistsError extends JobError {
    constructor(id: string) { 
        super(); 
        this.message = `A job with the ID \'${id}\' already exists.`;
    }
}

export class JobNotFoundError extends JobError {
    constructor(id: string) { super(); this.message = `The job with id ${id} does not exist.`; }
}

export class InvalidScheduleError extends JobError {
    constructor(schedule: string) { super(); this.message = `The schedule ${schedule} is invalid.`; }
}