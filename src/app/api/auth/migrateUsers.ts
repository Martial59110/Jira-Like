import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";
import { fakeUser } from "../db/data";

type OldUserData = {
  email: string;
  password: string;
  name: string;
  id: string;
};

const usersFilePath = join(process.cwd(), "src/app/api/auth/users.json");

export async function migrateUsersToHashed() {
  try {
    if (!existsSync(usersFilePath)) {
      return;
    }

    const fileContent = readFileSync(usersFilePath, "utf-8");
    const users: OldUserData[] = JSON.parse(fileContent);

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        if (
          user.password.startsWith("$2a$") ||
          user.password.startsWith("$2b$")
        ) {
          return user;
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    writeFileSync(usersFilePath, JSON.stringify(hashedUsers, null, 2), "utf-8");
  } catch (error) {
    console.error("Erreur lors de la migration:", error);
  }
}
