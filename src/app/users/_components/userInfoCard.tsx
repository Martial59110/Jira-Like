import type { User } from "../../api/db/data";

type UserInfoCardProps = {
  user: User;
};

export function UserInfoCard({ user }: UserInfoCardProps) {
  return (
    <section className="bg-white rounded-2xl shadow-[0_12px_32px_rgba(15,23,42,0.15)] p-8 w-full font-inherit">
      <header className="mb-4">
        <h1 className="text-[1.75rem] font-semibold m-0">{user.name}</h1>
        <p className="text-slate-500 mt-1 mb-0">{user.role}</p>
      </header>

      <dl className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 m-0">
        <div>
          <dt className="text-slate-400 text-sm">Email</dt>
          <dd className="mt-1 mb-0 font-medium">{user.email}</dd>
        </div>
        <div>
          <dt className="text-slate-400 text-sm">Équipe</dt>
          <dd className="mt-1 mb-0 font-medium">{user.team}</dd>
        </div>
        <div>
          <dt className="text-slate-400 text-sm">Projets actifs</dt>
          <dd className="mt-1 mb-0 font-medium">{user.projects}</dd>
        </div>
        <div>
          <dt className="text-slate-400 text-sm">Dernière connexion</dt>
          <dd className="mt-1 mb-0 font-medium">{user.lastLogin}</dd>
        </div>
      </dl>
    </section>
  );
}
