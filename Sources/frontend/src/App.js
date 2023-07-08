import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ActivityPage from "./Pages/ActivityPage";
import ProductPage from "./Pages/ProductPage";
import SupplierPage from "./Pages/SupplierPage";
import ExpertPage from "./Pages/ExpertPage";
import NavBar from "./Component/Navbar";
import Footer from "./Component/Footer";
import CategoryProductAdmin from "./admin/CategoryProductAdmin";
import BrandProductAdmin from "./admin/BrandProductAdmin";
import ProductAdmin from "./admin/ProductAdmin";
import ProductCreate from "./admin/Create/ProductCreate";
import LoadingPage from "./Pages/LoadingPage";
import ProductUpdate from "./admin/Update/ProductUpdate";
import ProductDetails from "./admin/Details/ProductDetails";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ExpertAdmin from "./admin/ExpertAdmin";
import CategoryExpertAdmin from "./admin/CategoryExpertAdmin";
import CategoryActivityAdmin from "./admin/CategoryActivityAdmin";
import ActivityAdmin from "./admin/ActivityAdmin";
import ActivityDetailPage from "./Pages/ActivityDetailPage";
import SupplierAdmin from "./admin/SupplierAdmin";
import Login from "./admin/Login";
import NavbarAdmin from "./Component/NavbarAdmin";
import AdminUser from "./admin/AdminUser";

function ClientLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
function AdminLayout() {
  return (
    <div>
      <NavbarAdmin />
      <Outlet />
    </div>
  );
}
const user =  localStorage.getItem("access_token");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="/" element={<Navigate replace to="/home.html" />} />
          <Route path="/loading.html" element={<LoadingPage />} />
          <Route path="/home.html" element={<HomePage />} />
          <Route path="/supplier.html" element={<SupplierPage />} />
          <Route path="/activity/:id.html" element={<ActivityPage />} />
          <Route path="/activity.html" element={<ActivityPage />} />
          <Route path="/expert.html" element={<ExpertPage />} />
          <Route path="/product.html" element={<ProductPage />} />
        
          <Route path="/product/:idbrand.html" element={<ProductPage />} />

          <Route
            path="/activity/detail/:id.html"
            element={<ActivityDetailPage />}
          />
          <Route
            path="/product/detail/:id.html"
            element={<ProductDetailPage />}
          />
        </Route>
        <Route path="/admin/login.html" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="/admin"
            element={<Navigate replace to="/admin/login.html" />}
          />
          {(user)?(<> <Route path="/admin/product.html" element={<ProductAdmin />} />
          <Route
            path="/admin/category-product.html"
            element={<CategoryProductAdmin />}
          />

          <Route path="/admin/brand.html" element={<BrandProductAdmin />} />
          <Route
            path="/admin/product/create.html"
            element={<ProductCreate />}
          />
          <Route
            path="/admin/product/update/:id.html"
            element={<ProductUpdate />}
          />
          <Route
            path="/admin/product/detail/:id.html"
            element={<ProductDetails />}
          />
          <Route path="/admin/expert.html" element={<ExpertAdmin />} />
          <Route
            path="/admin/category-expert.html"
            element={<CategoryExpertAdmin />}
          />
          <Route
            path="/admin/category-activity.html"
            element={<CategoryActivityAdmin />}
          />
          <Route path="/admin/activity.html" element={<ActivityAdmin />} />
          <Route path="/admin/user.html" element={<AdminUser />} />
          <Route path="/admin/supplier.html" element={<SupplierAdmin />} /></>):(<></>)}
         
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
