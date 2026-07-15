import axios from 'axios';

const apiURl = 'http://localhost:8000/api/producto/'; // URL de la API de Productos (Backend)
const reportsURl = 'http://localhost:8000/api/reports/'; // URL de la API de Reportes (app independiente)
const notificationsURl = 'http://localhost:8000/api/notifications/'; // URL de la API de Notificaciones (app independiente)

const productsAPI = axios.create({
    baseURL: apiURl,
});

// Clientes separados para las apps opcionales. Cuando su feature flag está
// apagado (variante A en config_product.py), config/urls.py ni siquiera
// registra estas rutas -> el backend responde 404.
const reportsAPI = axios.create({
    baseURL: reportsURl,
});

const notificationsAPI = axios.create({
    baseURL: notificationsURl,
});

export const getProducts = async () => productsAPI.get(); // Obtener Productos del Backend
export const getProduct = async (id) => productsAPI.get(`${id}/`); // Obtener un Producto por ID
export const createProduct = async (formData) => productsAPI.post('', formData); // Crear Producto
export const updateProduct = async (id, formData) => productsAPI.put(`${id}/`, formData); // Actualizar Producto
export const deleteProduct = async (id) => productsAPI.delete(`${id}/`); // Eliminar Producto por ID
export const getStats = async () => reportsAPI.get('stats/'); // Estadisticas para el dashboard (app reports)
export const exportProductsUrl = `${reportsURl}export/`; // Descarga CSV (app reports)
export const getAlerts = async () => notificationsAPI.get('alerts/'); // Alertas de stock bajo (app notifications)

export const CATEGORIAS = [
  { value: 'cafe', label: 'Café' },
  { value: 'postres', label: 'Postres' },
  { value: 'bebidas_frias', label: 'Bebidas Frías' },
  { value: 'panaderia', label: 'Panadería' },
  { value: 'otros', label: 'Otros' },
];

export const BASE_URL = 'http://localhost:8000';