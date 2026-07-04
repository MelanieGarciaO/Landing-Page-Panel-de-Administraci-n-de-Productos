import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import ProductForm from "./components/ProductForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/productos" element={<Dashboard />} />
        <Route
          path="/admin/productos/crear"
          element={
            <AdminLayout>
              <ProductForm />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/productos/editar/:id"
          element={
            <AdminLayout>
              <ProductForm />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
