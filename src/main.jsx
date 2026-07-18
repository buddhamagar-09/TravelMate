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

import MainSection from "./components/frontend/MainSection.jsx";
import Destination from "./components/frontend/Destination.jsx";
import Services from "./components/frontend/Services.jsx";
import Package from "./components/frontend/Package.jsx";
import About from "./components/frontend/About.jsx";
import Login from "./components/frontend/Login.jsx";
import Signup from "./components/frontend/Signup.jsx";
import PackageDetails from "./components/frontend/PackageDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<MainSection />} />
        <Route path="destination" element={<Destination />} />
        <Route path="services" element={<Services />} />
        <Route path="package" element={<Package />} />
        <Route path="package-details" element={<PackageDetails />} />
        <Route path="about" element={<About />} />
      </Route>
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
