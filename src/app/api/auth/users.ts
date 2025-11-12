import { fakeUser } from "../db/data";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

export type UserData = {
  email: string;
  password: string;
  name: string;
  id: string;
};

const usersFilePath = join(process.cwd(), "src/app/api/auth/users.json");

function getUsersFilePath() {
  return usersFilePath;
}

export function loadUsers(): UserData[] {
  try {
    const filePath = getUsersFilePath();
    if (existsSync(filePath)) {
      const fileContent = readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs:", error);
  }

  return [
    {
      email: fakeUser.email,
      password: "demo123",
      name: fakeUser.name,
      id: fakeUser.id,
    },
  ];
}

export function saveUsers(usersData: UserData[]) {
  try {
    const filePath = getUsersFilePath();
    writeFileSync(filePath, JSON.stringify(usersData, null, 2), "utf-8");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des utilisateurs:", error);
  }
}

export { saveUsers as saveUsersSync };

export function getUsers(): UserData[] {
  return loadUsers();
}

export async function addUser(
  user: Omit<UserData, "password"> & { password: string }
) {
  const users = loadUsers();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser: UserData = {
    ...user,
    password: hashedPassword,
  };
  users.push(newUser);
  saveUsers(users);
  return users;
}
