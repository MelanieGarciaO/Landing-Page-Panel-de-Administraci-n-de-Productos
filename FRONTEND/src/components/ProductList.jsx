import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct, BASE_URL } from "../api/products";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  AlertTriangle,
} from "lucide-react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteProductData, setDeleteProductData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  const loadProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filtra productos por nombre
  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async () => {
    if (deleteProductData) {
      await deleteProduct(deleteProductData.id);
      setDeleteProductData(null);
      loadProducts();
    }
  };

  return (
  <div className="space-y-8">

    {/* Encabezado */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      <div>
        <h2 className="text-3xl font-bold text-coffee-900 font-display">
          Inventario de Productos
        </h2>

        <p className="text-gray-500 mt-1">
          Administra todos los productos registrados.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

        <div className="relative w-full sm:w-72">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-coffee-400 outline-none"
          />
        </div>

        <button
          onClick={() => navigate("/admin/productos/crear")}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-coffee-700 text-white hover:bg-coffee-800 transition font-semibold"
        >
          <Plus size={18} />
          Crear producto
        </button>

      </div>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {paginatedProducts.map((product) => {

        const imageUrl = product.image_url
          ? `${BASE_URL}${product.image_url}`
          : `${BASE_URL}/static/img/default.jpg`;

        const lowStock = product.stock <= 5;

        return (

          <div
            key={product.id}
            className="
            bg-white
            rounded-3xl
            overflow-hidden
            shadow-sm
            border
            border-gray-200
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            flex
            flex-col
          "
          >

            <div className="relative">

              <img
                src={imageUrl}
                alt={product.nombre}
                className="w-full h-52 object-cover"
              />

              {lowStock && (

                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">

                  <AlertTriangle size={14} />

                  Stock bajo

                </div>

              )}

            </div>

            <div className="p-5 flex flex-col flex-1">

              <div className="flex items-center gap-2 mb-2">

                <Package
                  size={18}
                  className="text-coffee-700"
                />

                <h3 className="font-bold text-lg text-coffee-900 line-clamp-1">
                  {product.nombre}
                </h3>

              </div>

              <span className="inline-block w-fit px-3 py-1 rounded-full bg-coffee-100 text-coffee-700 text-xs font-semibold uppercase">

                {product.categoria_display}

              </span>

              <p className="mt-4 text-gray-500 text-sm line-clamp-2 flex-1">
                {product.descripcion}
              </p>

              <div className="mt-5">

                <p className="text-3xl font-bold text-coffee-800">
                  ${product.precio}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Stock disponible:
                  <span className="font-semibold ml-1">
                    {product.stock}
                  </span>
                </p>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    navigate(`/admin/productos/editar/${product.id}`)
                  }
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
                >
                  <Pencil size={17} />
                  Editar
                </button>

                <button
                  onClick={() => setDeleteProductData(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                >
                  <Trash2 size={17} />
                  Eliminar
                </button>

              </div>

            </div>

          </div>

        );

      })}

    </div>

    {/* Paginación */}

    {totalPages > 1 && (

      <div className="flex flex-wrap justify-center gap-2 pt-6">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>

        {[...Array(totalPages)].map((_, i) => (

          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-xl font-semibold transition ${
              currentPage === i + 1
                ? "bg-coffee-700 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>

        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>

      </div>

    )}

    {deleteProductData && (
      <DeleteConfirmModal
        product={deleteProductData}
        onConfirm={handleDelete}
        onCancel={() => setDeleteProductData(null)}
      />
    )}

  </div>
);
}