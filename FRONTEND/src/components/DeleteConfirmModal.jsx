import { useEffect, useState } from "react";
import { BASE_URL } from "../api/products";
import {
  TriangleAlert,
  Trash2,
  X,
} from "lucide-react";

export default function DeleteConfirmModal({
  product,
  onConfirm,
  onCancel,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (product) {
      setTimeout(() => setShow(true), 10);
    }
    return () => setShow(false);
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">

      <div
        className={`
          relative
          w-full
          max-w-md
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-3xl
          shadow-2xl
          transition-all
          duration-300
          ${
            show
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-5"
          }
        `}
      >

        {/* Botón cerrar */}
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 w-10 h-10 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
        >
          <X size={20} />
        </button>

        {/* Encabezado */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-8 text-center">

          <div className="mx-auto w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <TriangleAlert
              className="text-white"
              size={42}
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white font-display">
            Confirmar eliminación
          </h2>

          <p className="mt-2 text-red-100 text-sm">
            Esta acción eliminará el producto de forma permanente.
          </p>

        </div>

        {/* Contenido */}
        <div className="p-6 sm:p-8">

          <img
            src={`${BASE_URL}${product.image_url || "/static/img/default.jpg"}`}
            alt={product.nombre}
            className="
              w-32
              h-32
              sm:w-36
              sm:h-36
              object-cover
              rounded-2xl
              mx-auto
              shadow-lg
              border-4
              border-white
              -mt-20
              bg-white
            "
          />

          <h3 className="mt-6 text-center text-xl font-bold text-coffee-900">
            {product.nombre}
          </h3>

          <p className="mt-3 text-center text-gray-600 leading-relaxed">
            ¿Seguro que deseas eliminar este producto del inventario?
            <br />
            Esta acción no podrá deshacerse.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">

            <button
              onClick={onCancel}
              className="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                py-3
                rounded-xl
                border
                border-gray-300
                font-semibold
                hover:bg-gray-100
                transition
              "
            >
              <X size={18} />
              Cancelar
            </button>

            <button
              onClick={onConfirm}
              className="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                py-3
                rounded-xl
                bg-red-600
                text-white
                font-semibold
                hover:bg-red-700
                transition
              "
            >
              <Trash2 size={18} />
              Eliminar
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}