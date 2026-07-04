import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ExternalLink,
  Coffee,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname === "/admin/productos";

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-coffee-50">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-coffee-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-coffee-700 flex items-center justify-center shadow-md shrink-0">
                <Coffee size={24} className="text-white" />
              </div>

              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold text-coffee-900">
                  Aroma de Café
                </h1>

                <p className="text-xs sm:text-sm text-gray-500">
                  Panel Administrativo
                </p>
              </div>
            </Link>

            {/* Navegación */}
            <nav className="flex w-full sm:w-auto gap-3">

              <Link
                to="/admin/productos"
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isDashboard
                    ? "bg-coffee-700 text-white shadow-lg"
                    : "bg-white border border-coffee-100 text-coffee-700 hover:bg-coffee-50"
                }`}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all"
              >
                <ExternalLink size={18} />
                <span className="hidden sm:inline">
                  Sitio Web
                </span>
              </Link>

            </nav>

          </div>

        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

    </div>
  );
}