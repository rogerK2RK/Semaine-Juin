import { Request, Response } from 'express';
import logger from '../utils/logger';
import { findAllUsers, findUserById } from '../models/users.model';

export const getAllUsers = async (req: Request, res: Response) => {
  logger.info('[GET] Controller: Récupérer tous les utilisateurs');
  try {
    const users = await findAllUsers();
    res.status(200).json({ success: true, data: users, message: 'Utilisateurs récupérés avec succès' });
  } catch (error: any) {
    logger.error(`Controller: Erreur lors de la récupération des utilisateurs: ${error.message}`);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  logger.info(`[GET] Controller: Récupérer l’utilisateur avec l’ID ${userId}`);
  try {
    const user = await findUserById(userId);
    if (!user) {
      logger.warn(`Controller: Utilisateur avec l’ID ${userId} non trouvé`);
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ success: true, data: user, message: 'Utilisateur récupéré avec succès' });
  } catch (error: any) {
    logger.error(`Controller: Erreur lors de la récupération de l’utilisateur: ${error.message}`);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération de l’utilisateur' });
  }
};
