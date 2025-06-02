import logger from '../utils/logger';

// Simulation d’une base de données
const fakeUserDB = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

export const findAllUsers = async () => {
  logger.info('Modèle: Recherche de tous les utilisateurs');
  try {
    // Simuler un accès base de données
    return fakeUserDB;
  } catch (error: any) {
    logger.error(`Modèle: Erreur lors de la récupération des utilisateurs: ${error.message}`);
    throw error;
  }
};

export const findUserById = async (id: number) => {
  logger.info(`Modèle: Recherche de l’utilisateur avec l’ID ${id}`);
  try {
    const user = fakeUserDB.find((u) => u.id === id);
    if (!user) {
      logger.warn(`Modèle: Utilisateur avec l’ID ${id} non trouvé`);
      return null;
    }
    return user;
  } catch (error: any) {
    logger.error(`Modèle: Erreur lors de la recherche de l’utilisateur: ${error.message}`);
    throw error;
  }
};
