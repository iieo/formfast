
import { dbGetFormsByUserId } from '@/db/functions/form';

import Link from 'next/link';

export default async function Home() {

  const forms = await dbGetFormsByUserId();

  return (
    <div className="flex-grow w-full p-6 bg-main-800 text-white">
      <h1 className="text-2xl font-semibold mb-6">Forms</h1>

      {/* Action buttons */}
      <div className="flex gap-4 mb-8">
        <button className="flex items-center gap-2 bg-teal-800 text-white px-4 py-2 rounded-md">
          <span className="text-lg">📋</span> Neues Formular
        </button>
        <button className="flex items-center gap-2 bg-teal-800 text-white px-4 py-2 rounded-md">
          <span className="text-lg">📋</span> Neues Quiz
        </button>
        <button className="flex items-center gap-2 border border-gray-600 bg-gray-700 px-4 py-2 rounded-md">
          <span className="text-lg">↑</span> Schnellimport
        </button>
      </div>

      {/* Section title */}
      <h2 className="text-lg font-medium mb-4">Vorlagen erkunden</h2>

      {/* Template cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {["Feedback", "Registrierung", "Recherche", "Quiz"].map((template) => (
          <div key={template} className="bg-main-700 rounded-lg shadow overflow-hidden cursor-pointer transition-transform hover:scale-105">
            <div className={`h-40 flex items-center justify-center ${template === "Feedback" ? "bg-blue-600" :
              template === "Registrierung" ? "bg-orange-600" :
                template === "Recherche" ? "bg-indigo-600" :
                  "bg-pink-600"
              }`}>
              <span className="text-xl font-medium text-white">{template}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-gray-600 mb-6">
        <button className="px-4 py-2 border-b-2 border-teal-500 font-medium text-teal-400">Zuletzt verwendet</button>
        <button className="px-4 py-2 text-gray-300">Meine Formulare</button>
        <button className="px-4 py-2 text-gray-300">Ausgefüllte Formulare</button>
        <button className="px-4 py-2 text-gray-300">Mit mir geteilt</button>
        <button className="px-4 py-2 text-gray-300">Favoriten</button>
      </div>

      {/* Forms grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {forms.map((form) => (
          <Link
            key={form.id}
            href={`/form/${form.id}/edit`}
            className="bg-main-700 rounded-lg shadow-md overflow-hidden h-64 transition-transform hover:scale-105"
          >
            <div className="h-40 bg-gradient-to-r from-amber-600 to-amber-700"></div>
            <div className="p-4">
              <p className="text-lg font-medium text-white">{form.name}</p>
              <p className="text-sm text-gray-300 mt-1">
                Ausgefülltes Formular
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}