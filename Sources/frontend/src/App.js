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
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";

function ClientLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
function AdminLayout() {
  return <div></div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="/" element={<Navigate replace to="/home.html" />} />
          <Route path="/home.html" element={<HomePage />} />
          <Route path="/supplier.html" element={<SupplierPage />} />
          <Route path="/activity.html" element={<ActivityPage />} />
          <Route path="/expert.html" element={<ExpertPage />} />
          <Route path="/product.html" element={<ProductPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
