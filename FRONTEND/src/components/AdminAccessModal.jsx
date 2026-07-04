import { useNavigate } from "react-router-dom";
import { ShieldCheck, X, ArrowRight } from "lucide-react";

export default function AdminAccessModal({ open, onClose }) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6"
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-md
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-3xl
          shadow-2xl
          animate-fade-in-up
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-coffee-700 to-coffee-900 px-6 py-8 sm:p-8 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h2 className="mt-5 text-xl sm:text-2xl font-bold font-display text-white">
            Acceso restringido
          </h2>

          <p className="text-coffee-100 text-sm sm:text-base mt-2 leading-relaxed">
            Esta sección está destinada únicamente al personal autorizado.
          </p>
        </div>

        {/* Contenido */}
        <div className="p-6 sm:p-8">
          <div className="bg-coffee-50 border border-coffee-100 rounded-2xl p-4 mb-6">
            <p className="text-sm text-coffee-700 text-center leading-relaxed">
              Si eres administrador puedes continuar para gestionar el
              inventario, productos y estadísticas del sistema.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-3.5
                rounded-xl
                border
                border-coffee-200
                text-coffee-800
                font-semibold
                hover:bg-coffee-100
                transition
              "
            >
              <X size={18} />
              Cancelar
            </button>

            <button
              onClick={() => navigate("/admin/productos")}
              className="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-3.5
                rounded-xl
                bg-coffee-700
                text-white
                font-semibold
                hover:bg-coffee-800
                transition
              "
            >
              <ArrowRight size={18} />
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}