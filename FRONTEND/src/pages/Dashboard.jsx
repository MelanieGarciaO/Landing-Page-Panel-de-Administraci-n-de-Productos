import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  LayoutDashboard,
  RefreshCw,
  AlertTriangle,
  BarChart3,
  Download,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout.jsx";
import StatsCards from "../components/StatsCards.jsx";
import StockByCategoryChart from "../components/StockByCategoryChart.jsx";
import RecentProducts from "../components/RecentProducts.jsx";
import ProductList from "../components/ProductList.jsx";
import { getStats, exportProductsUrl } from "../api/products";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // La app "reports" puede estar desactivada desde settings.py (ENABLE_REPORTS).
  // En ese caso el backend responde 503 y mostramos un mensaje distinto al de error.
  const [reportsDisabled, setReportsDisabled] = useState(false);

  const navigate = useNavigate();

  const loadStats = async () => {
    setLoading(true);

    try {
      const res = await getStats();
      setStats(res.data);
      setError(false);
      setReportsDisabled(false);
    } catch (err) {
      if (err?.response?.status === 503) {
        setReportsDisabled(true);
        setError(false);
      } else {
        setError(true);
        setReportsDisabled(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <AdminLayout>

      {/* CABECERA */}
      <section className="mb-10">

        <div className="rounded-3xl bg-gradient-to-r from-coffee-700 via-coffee-800 to-coffee-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Texto */}
            <div className="flex items-start gap-4">

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <LayoutDashboard size={32} />
              </div>

              <div>

                <h1 className="text-3xl sm:text-4xl font-display font-bold">
                  Dashboard
                </h1>

                <p className="mt-3 text-coffee-100 max-w-xl leading-relaxed">
                  Administra el inventario de Café Aroma desde un solo
                  lugar. Consulta estadísticas, controla el stock y
                  gestiona todos los productos.
                </p>

              </div>

            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

              <button
                onClick={loadStats}
                className="flex items-center justify-center gap-2 rounded-xl bg-white/20 hover:bg-white/30 px-5 py-3 transition font-semibold"
              >
                <RefreshCw size={18} />
                Actualizar
              </button>

              <button
                onClick={() => navigate("/admin/productos/crear")}
                className="flex items-center justify-center gap-2 rounded-xl bg-white text-coffee-800 hover:bg-coffee-100 px-6 py-3 font-bold transition shadow"
              >
                <Plus size={18} />
                Nuevo producto
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* CARGANDO */}
      {loading && (
        <div className="rounded-3xl bg-white shadow-md border border-gray-200 p-12 text-center">

          <div className="w-14 h-14 border-4 border-coffee-200 border-t-coffee-700 rounded-full animate-spin mx-auto mb-6" />

          <h3 className="text-xl font-bold text-coffee-900">
            Cargando estadísticas...
          </h3>

          <p className="text-gray-500 mt-2">
            Espere unos segundos.
          </p>

        </div>
      )}

      {/* REPORTES DESACTIVADOS (ENABLE_REPORTS = False en settings.py) */}
      {!loading && reportsDisabled && (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <BarChart3 className="text-amber-600" size={30} />
          </div>

          <h3 className="text-2xl font-bold text-amber-700">
            Reportes desactivados
          </h3>

          <p className="text-amber-600 mt-2 max-w-md mx-auto">
            La funcionalidad de estadísticas y exportación está apagada
            (ENABLE_REPORTS = False). Actívala en settings.py para ver el
            dashboard.
          </p>

          <div className="mt-8 border-t border-amber-200 pt-8">
            <ProductList />
          </div>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle className="text-red-600" size={30} />
          </div>

          <h3 className="text-2xl font-bold text-red-700">
            Error al cargar
          </h3>

          <p className="text-red-500 mt-2">
            No fue posible obtener las estadísticas del inventario.
          </p>

          <button
            onClick={loadStats}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition font-semibold"
          >
            Intentar nuevamente
          </button>

        </div>
      )}

      {/* CONTENIDO */}
      {!loading && !error && stats && (
        <>

          {/* Botón de exportación (app "reports") */}
          <div className="flex justify-end mb-6">
            <a
              href={exportProductsUrl}
              download
              className="flex items-center gap-2 rounded-xl bg-coffee-700 hover:bg-coffee-800 text-white px-5 py-2.5 font-semibold transition"
            >
              <Download size={18} />
              Exportar CSV
            </a>
          </div>

          <StatsCards stats={stats} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

            <StockByCategoryChart
              data={stats.stock_por_categoria}
            />

            <RecentProducts
              products={stats.productos_recientes}
            />

          </div>

          <div className="mt-12 border-t border-gray-200 pt-10">
            <ProductList />
          </div>

        </>
      )}

    </AdminLayout>
  );
}