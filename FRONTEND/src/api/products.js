import axios from 'axios';

const apiURl = 'http://localhost:8000/api/producto/'; // URL de la API de Productos (Backend)

const productsAPI = axios.create({
    baseURL: apiURl,
});

export const getProducts = async () => productsAPI.get(); // Obtener Productos del Backend
export const getProduct = async (id) => productsAPI.get(`${id}/`); // Obtener un Producto por ID
export const createProduct = async (formData) => productsAPI.post('', formData); // Crear Producto
export const updateProduct = async (id, formData) => productsAPI.put(`${id}/`, formData); // Actualizar Producto
export const deleteProduct = async (id) => productsAPI.delete(`${id}/`); // Eliminar Producto por ID
export const getStats = async () => productsAPI.get('stats/'); // Estadisticas para el dashboard

export const CATEGORIAS = [
  { value: 'cafe', label: 'Café' },
  { value: 'postres', label: 'Postres' },
  { value: 'bebidas_frias', label: 'Bebidas Frías' },
  { value: 'panaderia', label: 'Panadería' },
  { value: 'otros', label: 'Otros' },
];

export const BASE_URL = 'http://localhost:8000';
