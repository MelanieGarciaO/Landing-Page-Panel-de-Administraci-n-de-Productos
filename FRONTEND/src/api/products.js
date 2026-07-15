import axios from 'axios';

const apiURl = 'http://localhost:8000/api/producto/'; // URL de la API de Productos (Backend)
const reportsURl = 'http://localhost:8000/api/reports/'; // URL de la API de Reportes (app independiente)

const productsAPI = axios.create({
    baseURL: apiURl,
});

// Cliente separado para la app "reports". Cuando ENABLE_REPORTS = False en el
// backend, estos endpoints responden 503 en lugar de datos.
const reportsAPI = axios.create({
    baseURL: reportsURl,
});

export const getProducts = async () => productsAPI.get();
export const getProduct = async (id) => productsAPI.get(`${id}/`);
export const createProduct = async (formData) => productsAPI.post('', formData);
export const updateProduct = async (id, formData) => productsAPI.put(`${id}/`, formData);
export const deleteProduct = async (id) => productsAPI.delete(`${id}/`);
export const getStats = async () => reportsAPI.get('stats/');
export const exportProductsUrl = `${reportsURl}export/`;

export const CATEGORIAS = [
  { value: 'cafe', label: 'Café' },
  { value: 'postres', label: 'Postres' },
  { value: 'bebidas_frias', label: 'Bebidas Frías' },
  { value: 'panaderia', label: 'Panadería' },
  { value: 'otros', label: 'Otros' },
];

export const BASE_URL = 'http://localhost:8000';