import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";

const postsController = {
    getAll: (request: Request, response: Response) => {
        try {
            logger.info("[GET] Récupérer tout les utilisateurs") // Log d'information en couleur
            const posts = [
                {
                    id: "uu5",
                    content: "abc"
                }, {
                    id: "uu6",
                    content: "def"
                }
            ]; // En attendant d'avoir un vrai model
            APIResponse(response, posts, "OK");
        } catch (error: any) {
            logger.error("Erreur lors de la récupération des posts: " + error.message);
            APIResponse(response, null, "Erreur lors de la récupération des posts", 500);
        }
    }
}

export default postsController