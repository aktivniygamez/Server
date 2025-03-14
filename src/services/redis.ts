import { createClient, RedisClientType } from "redis";
import LoggerService from "./log";

class Redis {
  protected port: number;
  protected host: string;
  client: RedisClientType;
  protected logger: LoggerService;

  private static instance: Redis; 
  private static readonly DEFAULT_HOST = "localhost";
  private static readonly DEFAULT_PORT = 6379;

  static getInstance(): Redis { 
    if (!Redis.instance) {
        Redis.instance = new Redis();
    }
    return Redis.instance;
  }

  constructor() {
    this.port = Redis.DEFAULT_PORT;
    this.host = Redis.DEFAULT_HOST;
    this.client = createClient({
      url: `redis://${this.host}:${this.port}`
    });

    this.logger = LoggerService.getInstance();

    this.client.on("error", (error: unknown) => this.logger.error("Redis error" + error));
    
    this.client.on("connect", () => console.log("TEST | Connection established"));
    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error: unknown) {
      this.logger.error("Redis error" + error)
    };
  }
}

export default Redis;