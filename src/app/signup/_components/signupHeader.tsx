export function SignupHeader() {
  return (
    <header className="text-center w-full">
      <div className="inline-flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">J</span>
        </div>
      </div>
      <h1 className="m-0 text-4xl font-bold text-slate-900 tracking-tight mb-3">
        Créer un compte
      </h1>
      <p className="mt-0 mb-0 text-base text-slate-600 leading-relaxed">
        Rejoignez-nous pour commencer à gérer vos projets
      </p>
    </header>
  );
}
