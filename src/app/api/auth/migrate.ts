import { migrateUsersToHashed } from "./migrateUsers";

migrateUsersToHashed()
  .then(() => {
    console.log("Migration terminée");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Erreur lors de la migration:", error);
    process.exit(1);
  });
