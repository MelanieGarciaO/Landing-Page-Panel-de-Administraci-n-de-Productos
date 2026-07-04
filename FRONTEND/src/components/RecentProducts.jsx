import { BASE_URL } from "../api/products";
import {
  PackageSearch,
  Tag,
  DollarSign,
  Boxes,
  TriangleAlert,
} from "lucide-react";

export default function RecentProducts({ products }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-5 sm:p-6">

      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-2xl bg-coffee-100 flex items-center justify-center flex-shrink-0">
          <PackageSearch
            className="text-coffee-700"
            size={24}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-coffee-900 font-display">
            Productos recientes
          </h3>

          <p className="text-sm text-gray-500">
            Últimos productos agregados al inventario.
          </p>
        </div>

      </div>

      {(!products || products.length === 0) && (
        <div className="text-center py-14 text-gray-500">
          No existen productos registrados.
        </div>
      )}

      <div className="space-y-4">

        {products?.map((p) => {

          const imageUrl = p.image_url
            ? `${BASE_URL}${p.image_url}`
            : `${BASE_URL}/static/img/default.jpg`;

          const lowStock = p.stock <= 5;

          return (

            <div
              key={p.id}
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                gap-4
                rounded-2xl
                border
                border-gray-200
                p-4
                hover:border-coffee-300
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* Imagen */}
              <img
                src={imageUrl}
                alt={p.nombre}
                className="
                  w-full
                  sm:w-20
                  h-48
                  sm:h-20
                  object-cover
                  rounded-2xl
                  shadow
                  flex-shrink-0
                "
              />

              {/* Información */}
              <div className="flex-1">

                <h4 className="font-bold text-lg text-coffee-900">
                  {p.nombre}
                </h4>

                <div className="flex flex-wrap gap-2 mt-3">

                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-coffee-100 text-coffee-700 text-xs font-semibold">
                    <Tag size={13} />
                    {p.categoria_display}
                  </span>

                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold">
                    <Boxes size={13} />
                    {p.stock} unidades
                  </span>

                  {lowStock && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                      <TriangleAlert size={13} />
                      Stock bajo
                    </span>
                  )}

                </div>

              </div>

              {/* Precio */}
              <div className="sm:text-right">

                <div className="flex items-center sm:justify-end gap-1 text-2xl font-bold text-coffee-700">
                  <DollarSign size={18} />
                  {Number(p.precio).toFixed(2)}
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Precio de venta
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}