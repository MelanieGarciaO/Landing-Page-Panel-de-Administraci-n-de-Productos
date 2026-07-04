import {
  Coffee,
  Wallet,
  Package,
  TriangleAlert,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function StatsCards({ stats }) {
  const cards = [
    {
      label: "Productos",
      value: stats.total_productos,
      icon: Coffee,
      iconBg: "bg-amber-100 text-amber-700",
      gradient: "from-amber-50 via-white to-white",
    },
    {
      label: "Valor del inventario",
      value: `$${Number(stats.valor_inventario).toFixed(2)}`,
      icon: Wallet,
      iconBg: "bg-emerald-100 text-emerald-700",
      gradient: "from-emerald-50 via-white to-white",
    },
    {
      label: "Stock disponible",
      value: stats.stock_total,
      icon: Package,
      iconBg: "bg-sky-100 text-sky-700",
      gradient: "from-sky-50 via-white to-white",
    },
    {
      label: "Stock bajo",
      value: stats.stock_bajo,
      icon: TriangleAlert,
      iconBg:
        stats.stock_bajo > 0
          ? "bg-red-100 text-red-700"
          : "bg-orange-100 text-orange-700",
      gradient:
        stats.stock_bajo > 0
          ? "from-red-50 via-white to-white"
          : "from-orange-50 via-white to-white",
      alert: stats.stock_bajo > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/40
              bg-gradient-to-br
              ${card.gradient}
              backdrop-blur-xl
              p-6
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
            `}
          >
            {/* Línea superior */}
            <div
              className={`absolute top-0 left-0 h-1 w-full ${
                card.alert
                  ? "bg-red-500"
                  : "bg-coffee-700"
              }`}
            />

            {/* Decoración */}
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/30 blur-3xl" />

            <div className="relative z-10">

              {/* Parte superior */}
              <div className="flex items-center justify-between mb-8">

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${card.iconBg}`}
                >
                  <Icon size={30} />
                </div>

                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    card.alert
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {card.alert ? (
                    <>
                      <TriangleAlert size={14} />
                      Atención
                    </>
                  ) : (
                    <>
                      <TrendingUp size={14} />
                      Normal
                    </>
                  )}
                </div>

              </div>

              {/* Valor */}
              <h2 className="text-4xl font-bold text-gray-900 font-display tracking-tight">
                {card.value}
              </h2>

              {/* Etiqueta */}
              <p className="mt-2 text-gray-600 font-medium">
                {card.label}
              </p>

              {/* Pie */}
              <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                <Activity size={15} />
                Actualizado en tiempo real
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}