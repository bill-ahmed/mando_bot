export default abstract class CRONJob {
    constructor() { }

    /** MUST OVERRIDE THIS METHOD. */
    public static perform(args?: any): any {
        throw new Error("The perform() method is not overrided.");
    }
}