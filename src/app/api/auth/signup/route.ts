import { getUsers, addUser } from "../users";

type SignupRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupResponse = {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupRequest;

    if (!body.name || !body.email || !body.password || !body.confirmPassword) {
      return Response.json(
        { success: false, error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    if (body.password !== body.confirmPassword) {
      return Response.json(
        { success: false, error: "Les mots de passe ne correspondent pas" },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return Response.json(
        {
          success: false,
          error: "Le mot de passe doit contenir au moins 6 caractères",
        },
        { status: 400 }
      );
    }

    const users = getUsers();
    const existingUser = users.find((u) => u.email === body.email);
    if (existingUser) {
      return Response.json(
        { success: false, error: "Cet email est déjà utilisé" },
        { status: 409 }
      );
    }

    const newUserId = `usr_${Date.now()}`;

    await addUser({
      email: body.email,
      password: body.password,
      name: body.name,
      id: newUserId,
    });

    return Response.json({
      success: true,
      user: {
        id: newUserId,
        name: body.name,
        email: body.email,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, error: "Erreur lors de la création du compte" },
      { status: 500 }
    );
  }
}
