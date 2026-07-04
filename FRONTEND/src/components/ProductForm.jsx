import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, createProduct, updateProduct, CATEGORIAS } from "../api/products";
import {
  FaTag,
  FaAlignLeft,
  FaDollarSign,
  FaBoxes,
  FaFolderOpen,
  FaImage,
  FaSave,
  FaTimes,
  FaCube,
} from "react-icons/fa";

export default function ProductForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("cafe");
  const [stock, setStock] = useState("0");
  const [imagen, setImagen] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
      getProduct(id).then((res) => {
        setNombre(res.data.nombre);
        setDescripcion(res.data.descripcion);
        setPrecio(res.data.precio);
        setCategoria(res.data.categoria || "cafe");
        setStock(res.data.stock ?? 0);
        // No se carga imagen aquí, solo si el usuario selecciona una nueva
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    formData.append("categoria", categoria);
    formData.append("stock", stock);
    if (imagen) formData.append("imagen", imagen);

    try {
      if (id) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate("/admin/productos");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/productos");
  };

  const inputClass =
    "w-full rounded-xl border border-coffee-200 px-4 py-3 bg-white shadow-sm focus:border-coffee-500 focus:ring-2 focus:ring-coffee-300 outline-none transition";

  return (
  <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-coffee-100 overflow-hidden">
    <div className="p-6 sm:p-8 lg:p-10">

      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-10 pb-6 border-b border-coffee-200 text-center sm:text-left">
        <div className="w-20 h-20 rounded-2xl bg-coffee-100 flex items-center justify-center shadow">
          <FaCube className="text-4xl text-coffee-700" />
        </div>

        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-coffee-900">
            {id ? "Editar Producto" : "Crear Producto"}
          </h2>

          <p className="text-coffee-500 mt-2">
            Completa la información del producto para agregarlo al inventario.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Nombre */}
        <div>
          <label className="flex items-center gap-2 font-semibold text-coffee-800 mb-2">
            <FaTag className="text-coffee-600" />
            Nombre del producto
          </label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClass}
            placeholder="Ej. Cappuccino"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="flex items-center gap-2 font-semibold text-coffee-800 mb-2">
            <FaAlignLeft className="text-coffee-600" />
            Descripción
          </label>

          <textarea
            rows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Describe el producto..."
            required
          />
        </div>

        {/* Precio y Stock */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="flex items-center gap-2 font-semibold text-coffee-800 mb-2">
              <FaDollarSign className="text-coffee-600" />
              Precio
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className={inputClass}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 font-semibold text-coffee-800 mb-2">
              <FaBoxes className="text-coffee-600" />
              Existencias
            </label>

            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className={inputClass}
              placeholder="0"
              required
            />
          </div>

        </div>

        {/* Categoría */}
        <div>
          <label className="flex items-center gap-2 font-semibold text-coffee-800 mb-2">
            <FaFolderOpen className="text-coffee-600" />
            Categoría
          </label>

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className={`${inputClass} bg-white`}
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Imagen */}
        <div>
          <label className="flex items-center gap-2 font-semibold text-coffee-800 mb-3">
            <FaImage className="text-coffee-600" />
            Imagen del producto
          </label>

          <div className="border-2 border-dashed border-coffee-300 rounded-2xl bg-coffee-50 hover:bg-white hover:border-coffee-600 transition-all p-10 text-center">

            <FaImage className="text-6xl text-coffee-400 mx-auto mb-5" />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
              className="block w-full text-sm text-coffee-700
              file:mr-4
              file:rounded-lg
              file:border-0
              file:bg-coffee-700
              file:px-5
              file:py-2
              file:text-white
              file:cursor-pointer
              hover:file:bg-coffee-800"
            />

            <p className="text-sm text-coffee-500 mt-4">
              Arrastra una imagen aquí o selecciona un archivo.
            </p>

          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-8 mt-8 border-t border-coffee-200">

          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
          >
            <FaTimes />
            Cancelar
          </button>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-coffee-700 text-white font-semibold shadow-lg hover:bg-coffee-800 hover:shadow-xl transition disabled:opacity-60"
          >
            <FaSave />
            {saving ? "Guardando..." : "Guardar Producto"}
          </button>

        </div>

      </form>

    </div>
  </div>
);
}