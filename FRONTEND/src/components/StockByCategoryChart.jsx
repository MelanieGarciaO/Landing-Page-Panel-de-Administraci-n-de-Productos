import {
  Package2,
  Boxes,
  Percent,
} from "lucide-react";

export default function StockByCategoryChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-coffee-100 flex items-center justify-center">
            <Package2 className="text-coffee-700" size={24} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-coffee-900 font-display">
              Stock por categoría
            </h3>

            <p className="text-sm text-gray-500">
              Distribución del inventario.
            </p>
          </div>
        </div>

        <div className="py-14 text-center text-gray-500">
          No existen categorías registradas.
        </div>
      </div>
    );
  }

  const maxStock = Math.max(...data.map((d) => d.total_stock), 1);

  const colors = [
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-green-600",
    "from-sky-400 to-blue-600",
    "from-pink-400 to-rose-600",
    "from-violet-400 to-purple-600",
    "from-yellow-400 to-amber-600",
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-5 sm:p-6">

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-coffee-100 flex items-center justify-center">
            <Package2
              className="text-coffee-700"
              size={24}
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-coffee-900 font-display">
              Stock por categoría
            </h3>

            <p className="text-sm text-gray-500">
              Resumen del inventario por categorías.
            </p>
          </div>

        </div>

      </div>

      <div className="space-y-6">

        {data.map((item, index) => {

          const percent =
            (item.total_stock / maxStock) * 100;

          return (

            <div
              key={item.categoria}
              className="rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all"
            >

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                <div>

                  <div className="flex items-center gap-2">

                    <Boxes
                      size={18}
                      className="text-coffee-700"
                    />

                    <h4 className="font-bold text-coffee-900">
                      {item.categoria_display}
                    </h4>

                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.total_productos} productos registrados
                  </p>

                </div>

                <div className="flex items-center gap-6">

                  <div className="text-center">

                    <p className="text-2xl font-bold text-coffee-800">
                      {item.total_stock}
                    </p>

                    <p className="text-xs text-gray-500">
                      Unidades
                    </p>

                  </div>

                  <div className="text-center">

                    <div className="flex items-center justify-center gap-1 text-green-600 font-bold">
                      <Percent size={15} />
                      {percent.toFixed(0)}%
                    </div>

                    <p className="text-xs text-gray-500">
                      del máximo
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-5 h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    colors[index % colors.length]
                  } transition-all duration-1000`}
                  style={{
                    width: `${Math.max(percent, 8)}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}