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
import Contact from "./components/frontend/Contact.jsx";
import Services from "./components/frontend/Services.jsx";
import Shop from "./components/frontend/Shop.jsx";
import About from "./components/frontend/About.jsx";
import Login from "./components/frontend/Login.jsx";
import Signup from "./components/frontend/Signup.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<MainSection />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
        <Route path="shop" element={<Shop />} />
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
