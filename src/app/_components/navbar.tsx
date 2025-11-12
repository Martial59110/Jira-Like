"use client";

import { useState } from "react";
import Link from "next/link";
import type { User } from "../api/db/data";
import { CreateIssueModal } from "./createIssueModal";

type NavbarProps = {
  user: User;
  onIssueCreated?: () => void;
};

export function Navbar({ user, onIssueCreated }: NavbarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">J</span>
                </div>
                <span className="text-xl font-bold text-slate-900">
                  Jira-like
                </span>
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors"
                >
                  Tableaux
                </Link>
                <button
                  className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors"
                  onClick={() => alert("Fonctionnalité à venir")}
                >
                  Projets
                </button>
                <button
                  className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors"
                  onClick={() => alert("Fonctionnalité à venir")}
                >
                  Filtres
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Créer
              </button>
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-slate-700">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <CreateIssueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          if (onIssueCreated) {
            onIssueCreated();
          }
        }}
      />
    </>
  );
}
