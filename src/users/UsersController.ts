import { FastifyRequest, FastifyReply } from "fastify";
import * as bcrypt from "bcryptjs";
import User from "./users.model";

class UsersController {
    async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { name, password } = request.body as { name: string; password: string };
            if (!name || !password) {
                return reply.status(400).send({ error: "Name and password are required" });
            }

            const existingUser = await User.findOne({ where: { name } });
            if (existingUser) {
                return reply.status(400).send({ error: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, password: hashedPassword, balance: 100 });

            request.session.set("user", { id: user.id, name: user.name });
            return reply.status(201).send({ id: user.id, name: user.name });
        } catch (error) {
            return reply.status(500).send({ error: "Internal Server Error" });
        }
    }

    async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { name, password } = request.body as { name: string; password: string };
            if (!name || !password) {
                return reply.status(400).send({ error: "Name and password are required" });
            }

            const user = await User.findOne({ where: { name } });
            if (!user) {
                return reply.status(400).send({ error: "Invalid credentials" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return reply.status(400).send({ error: "Invalid credentials" });
            }

            request.session.set("user", { id: user.id, name: user.name });
            return reply.send({ id: user.id, name: user.name });
        } catch (error) {
            return reply.status(500).send({ error: "Internal Server Error" });
        }
    }
}

export default new UsersController();