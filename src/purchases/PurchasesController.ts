import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../users/users.model';
import Purchases from './purchases.model';
import Product from '../products/products.model';

class PurchaseController {
  async purchaseProduct(request: FastifyRequest<{ Body: { productId: number } }>, reply: FastifyReply): Promise<void> {
    try {
      const userSession = request.session.get("user");
      if (!userSession) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }

      const user = await User.findByPk(userSession.id);
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      const productId = Number(request.body.productId);
      console.log(productId)
      const product = await Product.findByPk(productId);
      if (!product) {
        return reply.status(404).send({ error: 'Product not found' });
      }

      if (user.balance < product.min_tradable_price) {
        return reply.status(400).send({ error: 'Insufficient balance' });
      }

      user.balance -= product.min_tradable_price;
      await user.save();

      let purchase = await Purchases.findOne({ where: { user_id: user.id } });
      if (!purchase) {
        purchase = await Purchases.create({ user_id: user.id, basket: [] });
      }
      purchase.basket.push(Number(productId));
      await purchase.save();

      return reply.send({ balance: user.balance });
    } catch (error: unknown) {
      return reply.status(500).send({ error: 'Failed to complete purchase' });
    }
  }
}


export default new PurchaseController();