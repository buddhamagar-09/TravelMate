import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainSection from "./components/frontend/MainSection.jsx";
import Destination from "./components/frontend/Destination.jsx";
import Services from "./components/frontend/Services.jsx";
import Package from "./components/frontend/Package.jsx";
import About from "./components/frontend/About.jsx";
import Login from "./components/frontend/Login.jsx";
import Signup from "./components/frontend/Signup.jsx";
import PackageDetails from "./components/frontend/PackageDetails.jsx";
import BookingForm from "./components/frontend/BookingForm.jsx";

// admin routes
import AdminLayout from "./admin/layouts/MainLayout.jsx";
import AdminDashboard from "./admin/pages/Dashboard.jsx";
import AddPackage from "./admin/pages/AddPackage.jsx";
import ViewPackage from "./admin/pages/ViewPackage.jsx";
import Itinerary from "./admin/pages/Itenaries.jsx";
import GalleryStep from "./admin/pages/GalleryStep.jsx";
import Includes from "./admin/pages/Includes.jsx";
import Excludes from "./admin/pages/Excludes.jsx";
import ViewUser from "./admin/pages/ViewUser.jsx";
import ViewBookings from "./admin/pages/ViewBookings.jsx";
import MyBookings from "./components/frontend/MyBookings.jsx";
import BookingDetails from "./components/frontend/BookingDetails.jsx";
import ViewReview from "./admin/pages/ViewReview.jsx";
import EsewaSuccessPage from "./components/frontend/EsewaSuccessPage.jsx";
import EsewaFailurePage from "./components/frontend/EsewaFailurePage.jsx";

//protected route
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<MainSection />} />
        <Route path="destination" element={<Destination />} />
        <Route path="plan" element={<Services />} />
        <Route path="package" element={<Package />} />
        <Route path="package/:id" element={<PackageDetails />} />
        <Route path="about" element={<About />} />
        <Route path="bookingform/:id" element={<BookingForm />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="booking-details/:id" element={<BookingDetails />} /> 
        <Route path="esewa-success/:booking_id" element={<EsewaSuccessPage />} />
        <Route path="esewa-failure/:bookingId" element={<EsewaFailurePage />} />
        
      </Route>
      {/* admin routes */}
      {/* protected routes for admin only */}
      <Route element={<ProtectedRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          {/* default route to admin/home  */}

          <Route path="" element={<AdminDashboard />} />
          <Route path="add-package" element={<AddPackage />} />
          <Route path="view-packages" element={<ViewPackage />} />
          <Route path="itinerary/:id" element={<Itinerary />} />
          <Route path="gallery/:id" element={<GalleryStep />} />
          <Route path="includes/:id" element={<Includes />} />
          <Route path="excludes/:id" element={<Excludes />} />
          <Route path="view-users" element={<ViewUser />} />
          <Route path="view-bookings" element={<ViewBookings />} />
          <Route path="reviews" element={<ViewReview />} />

          {/* edit routes */}
          <Route path="edit-package/:id" element={<AddPackage />} />
          <Route path="edit-itinerary/:id" element={<Itinerary />} />
          <Route path="edit-gallery/:id" element={<GalleryStep />} />
          <Route path="edit-includes/:id" element={<Includes />} />
          <Route path="edit-excludes/:id" element={<Excludes />} />
        </Route>
      </Route>
      {/* login */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </>,
  ),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#333",
          border: "1px solid #e5e7eb",
        },
      }}
    />
  </QueryClientProvider>,
);
