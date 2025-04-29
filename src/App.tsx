import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ArtisanRegistrationPage from './pages/ArtisanRegistrationPage'
import LoginPage from './pages/LoginPage'
import ArtisanDashboardPage from './pages/artisan/DashboardPage'
import ArtisanProfilePage from './pages/artisan/ProfilePage'
import ArtisanProductsPage from './pages/artisan/ProductsPage'
import ArtisanOrdersPage from './pages/artisan/OrdersPage'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import BuyerProfilePage from './pages/buyer/ProfilePage'
import BuyerOrdersPage from './pages/buyer/OrdersPage'
import AdminDashboardPage from './pages/admin/DashboardPage'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="registro-artesano" element={<ArtisanRegistrationPage />} />
        <Route path="iniciar-sesion" element={<LoginPage />} />
        <Route path="catalogo" element={<CatalogPage />} />
        <Route path="producto/:id" element={<ProductDetailPage />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="artesano/:id" element={<ArtisanProfilePage />} />
        
        {/* Buyer routes */}
        <Route path="mi-perfil" element={<BuyerProfilePage />} />
        <Route path="mis-pedidos" element={<BuyerOrdersPage />} />
        
        {/* Artisan routes */}
        <Route path="dashboard">
          <Route index element={<ArtisanDashboardPage />} />
          <Route path="perfil" element={<ArtisanProfilePage />} />
          <Route path="productos" element={<ArtisanProductsPage />} />
          <Route path="pedidos" element={<ArtisanOrdersPage />} />
        </Route>
        
        {/* Admin routes */}
        <Route path="admin" element={<AdminDashboardPage />} />
        
        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App