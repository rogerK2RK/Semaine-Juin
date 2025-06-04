import { db } from "../config/pool";
import logger from "../utils/logger";

import { comments, posts, users } from "../schemas";
import { NewUser } from "../entities/User";
import { postModel } from "./posts.model";
import { eq } from "drizzle-orm";

export const userModel = {
    getAll: () => {
        try {
            return db.select({
                id: users.id,
                username: users.username
            }).from(users);
        } catch (err: any) {
            logger.error(`Erreur lors de la récupération des utilisateurs; ${err.message}`);
            throw new Error("Impossible de récupérer les utilisateurs")
        }
    },
    get: (id: string) => {
        try {
            return db.select({
                id: users.id,
                username: users.username,
                comments: {
                    id: comments.id,
                    content: comments.content
                },
                posts: {
                    id: posts.id,
                    title: posts.title
                }
            }).from(users)
            .where(
                eq(users.id, id)
            )
        } catch (err: any) {
            logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    },
    findByCredentials: (email: string) => {
        try {
            return db.select({
                id: users.id,
                password: users.password,
                username: users.username,
                email: users.email
            }).from(users)
            .where(
                eq(users.email, email)
            )
        } catch (err: any) {
            logger.error(`Erreur lors de la récupération de l'utilisateur; ${err.message}`);
            throw new Error("Impossible de récupérer l'utilisateur")
        }
    },
    create: (user: NewUser) => {
        try {
            return db.insert(users).values(user).returning({ id: users.id });
        } catch (err: any) {
            logger.error(`Erreur lors de la création de l'utilisateur; ${err.message}`);
            throw new Error("Impossible de créer l'utilisateur")
        }
    }
}

/*
    - getAll()
    - get(id: string)
    - findByCredentials(email: string)
    - create(user: NewUser)
*/