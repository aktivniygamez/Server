import { FastifyReply, FastifyRequest } from 'fastify';
import Redis from '../services/redis';
import axios from 'axios';
import Product from './products.model';

class ProductsController {
  private redis: Redis;
  private static readonly SKINPORT_API_URL: string = process.env.SKINPORT_API_URL || 'https://api.skinport.com/v1/items';

  constructor() {
    this.redis = Redis.getInstance();
  }

  async getItems(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const cache = await this.redis.client.get('items');
      if (cache) return reply.send(JSON.parse(cache));

      const { data } = await axios.get(ProductsController.SKINPORT_API_URL, { params: { currency: 'USD' } });
      const items = data.map((item: { market_hash_name: string, suggested_price: number, min_price: number}) => ({
        market_hash_name: item.market_hash_name,
        min_tradable_price: item.suggested_price,
        min_no_tradable_price: item.min_price,
      }));
      await this.redis.client.setEx('items', 300, JSON.stringify(items));
      return reply.send(items);
    } catch (error: unknown) {
      return reply.status(500).send({ error: 'Failed to fetch items' });
    }
  }

  async createProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const { market_hash_name, min_tradable_price, min_no_tradable_price } = request.body as {
        market_hash_name: string;
        min_tradable_price: number;
        min_no_tradable_price: number;
      };

      if (!market_hash_name || min_tradable_price < 0 || min_no_tradable_price < 0) {
        return reply.status(400).send({ error: 'Invalid input data' });
      }

      const product = await Product.create({ market_hash_name, min_tradable_price, min_no_tradable_price });

      const cachedItems = await this.redis.client.get('items');
      if (cachedItems) {
        const items = JSON.parse(cachedItems);
        items.push(product);
        await this.redis.client.setEx('items', 300, JSON.stringify(items));
      }

      return reply.status(201).send(product);
    } catch (error: unknown) {
      return reply.status(500).send({ error: 'Failed to create product' });
    }
  }
}

export default new ProductsController();