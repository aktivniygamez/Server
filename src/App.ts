import Fastify, { FastifyInstance } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import UserController from "./users/UsersController";
import PurchasesController from "./purchases/PurchasesController";
import ProductsController from "./products/ProductsController";
import sequelize from "./services/sequelize";
import LoggerService from "./services/log";
import { FASTIFY_SECRET } from "./utils/config";

class App {
  private app: FastifyInstance;
  protected logger: LoggerService;

  constructor() {
    this.app = Fastify();
    this.setupPlugins();
    this.setupRoutes();

    this.logger = LoggerService.getInstance();
  }

  private setupPlugins(): void {
    this.app.register(fastifyCookie);
    this.app.register(fastifySession, {
      secret: FASTIFY_SECRET,
      cookie: { secure: false },
      saveUninitialized: false,
    });
  }

  private setupRoutes(): void {
    this.app.post("/register", UserController.register);
    this.app.post("/login", UserController.login);

    this.app.get("/items", ProductsController.getItems);
    this.app.post("/items", ProductsController.createProduct);

    this.app.post("/purchase", PurchasesController.purchaseProduct);
  }

  public async start(): Promise<void> {
    try {
      await sequelize.sync();
      await this.app.listen({ port: 3000 });
      this.logger.info("Server running on http://localhost:3000");
    } catch (error: unknown) {
      this.logger.error("App error" + error);
      process.exit(1);
    }
  }
}

export default App;
