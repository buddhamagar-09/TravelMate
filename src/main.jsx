import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MainSection from "./components/frontend/MainSection.jsx";
import Destination from "./components/frontend/Destination.jsx";
import Services from "./components/frontend/Services.jsx";
import Package from "./components/frontend/Package.jsx";
import About from "./components/frontend/About.jsx";
import Login from "./components/frontend/Login.jsx";
import Signup from "./components/frontend/Signup.jsx";
import PackageDetails from "./components/frontend/PackageDetails.jsx";

// admin routes
import AdminLayout from "./admin/layouts/MainLayout.jsx";
import AdminDashboard from "./admin/pages/Dashboard.jsx";
import AddPackage from "./admin/pages/AddPackage.jsx";
import ViewPackage from "./admin/pages/ViewPackage.jsx";
import Itinerary from "./admin/pages/Itenaries.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<MainSection />} />
        <Route path="destination" element={<Destination />} />
        <Route path="services" element={<Services />} />
        <Route path="package" element={<Package />} />
        <Route path="package/:id" element={<PackageDetails />} />
        <Route path="about" element={<About />} />
      </Route>
      {/* admin routes */}
      <Route path="admin" element={<AdminLayout />}>
        {/* default route to admin/home  */}

        <Route path="" element={<AdminDashboard />} />
        <Route path="add-package" element={<AddPackage />} />
        <Route path="view-packages" element={<ViewPackage />} />
        <Route path="itinerary" element={<Itinerary />} />
      </Route>
      {/* login */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
