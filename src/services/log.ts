import log4js from "log4js";

class LoggerService {
    private logger: log4js.Logger;
    private static instance: LoggerService;

    static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
      }
  
    constructor(level: LogLevel = LogLevel.INFO) {
      log4js.configure({
        appenders: {
          console: { type: "console" },
          file: { type: "file", filename: "logs/server.log" },
        },
        categories: {
          default: { appenders: ["console", "file"], level },
        },
      });
  
      this.logger = log4js.getLogger();
    }
  
    public log(level: LogLevel, message: string, error?: unknown): void {
      this.logger[level](message, error);
    }
  
    public info(message: string): void {
      this.log(LogLevel.INFO, message);
    }
  
    public warn(message: string): void {
      this.log(LogLevel.WARN, message);
    }
  
    public error(message: string, error?: unknown): void {
      this.log(LogLevel.ERROR, message, error);
    }
  }

  export default LoggerService;