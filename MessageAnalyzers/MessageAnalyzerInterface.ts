/**An interface for implementing a message analyzer */
export default interface MessageAnalyzer{
    analyzeMessage(message: string): string | null;
}