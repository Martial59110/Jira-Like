"use client";

import Link from "next/link";
import type { User } from "../api/db/data";

type SidebarProps = {
  user: User;
};

export function Sidebar({ user }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 h-[calc(100vh-73px)] overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-slate-700">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 m-0">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 m-0">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-orange-50 text-orange-600 text-sm font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
            />
          </svg>
          Tableaux
        </Link>
        <button
          onClick={() => alert("Fonctionnalité à venir")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors w-full text-left"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Projets
        </button>
        <button
          onClick={() => alert("Fonctionnalité à venir")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors w-full text-left"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filtres
        </button>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Informations
        </p>
        <div className="space-y-2 text-sm">
          <div>
            <p className="text-slate-500 m-0 text-xs">Équipe</p>
            <p className="text-slate-900 font-medium m-0">{user.team}</p>
          </div>
          <div>
            <p className="text-slate-500 m-0 text-xs">Projets actifs</p>
            <p className="text-slate-900 font-medium m-0">{user.projects}</p>
          </div>
          <div>
            <p className="text-slate-500 m-0 text-xs">Dernière connexion</p>
            <p className="text-slate-900 font-medium m-0">{user.lastLogin}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
