import { createBrowserRouter } from "react-router-dom";
import LayOut from "./../Components/LayOut/LayOut";

import Home from "./../Components/Home/Home";
import AdminDashboard from "./../Components/Dashboard/AdminDashboard";
import ManageProducts from "./../Components/Admin/ManageProducts";
import UserDashboard from "../Components/Dashboard/UserDashboard";
import MyOrders from "./../Components/Users/MyOrders";
import DashboardLayout from "../Components/LayOut/DashboardLayout";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import PrivateRoute from "../Components/Auth/PrivateRoute";
import PhoneDetails from "../Components/pages/PhoneDetails";
import TermsConditions from "../Components/Home/TermsConditions";
import PrivacyPolicy from "../Components/pages/PrivacyPolicy";
import AllBrands from "../Components/pages/AllBrands";
import AccessoriesDetails from "../Components/Home/AccessoriesDetails";
import Accessories from "../Components/Home/Accessories";
import Contact from "../Components/Home/Contact";
import Blog from "../Components/Home/Blog";
import ErrorPage from "../Components/pages/ErrorPage";
import FlashSaleDetails from "../Components/pages/FlashSaleDetails";
import FlashSale from "../Components/pages/FlashSale";
import Faq from "../Components/Home/Faq";
import ShippingPolicy from "../Components/Home/ShippingPolicy";
import ReturnPolicy from "../Components/Home/ReturnPolicy";
import AddProduct from "../Components/Admin/AddProduct";
import AdminRoute from "../Components/Admin/AdminRoute";
import AllUsers from "../Components/Admin/AllUsers";
import AddToCart from "../Components/Shared/AddToCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/phones",
        element: <AllBrands></AllBrands>,
      },

      {
        path: "Terms&Conditions",
        element: <TermsConditions></TermsConditions>,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "Contact",
        element: <Contact></Contact>,
      },
      {
        path: "blog",
        element: <Blog></Blog>,
      },
      {
        path: "accessories",
        element: <Accessories></Accessories>,
      },
      {
        path: "/accessories/:slug",
        element: <AccessoriesDetails></AccessoriesDetails>,
      },
      {
        path: "/phone/:slug",
        element: <PhoneDetails></PhoneDetails>,
      },

      {
        path: "/flash-sale/:id",
        element: <FlashSaleDetails />,
      },
      {
        path: "/flash-sale",
        element: <FlashSale></FlashSale>,
      },
      {
        path: "faq",
        element: <Faq></Faq>,
      },
      {
        path: "/Shipping-Policy",
        element: <ShippingPolicy></ShippingPolicy>,
      },
      {
        path: "Return-Policy",
        element: <ReturnPolicy></ReturnPolicy>,
      },

      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "/cart",
        element: <AddToCart></AddToCart>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin",
        element: (
          <AdminRoute>
            {" "}
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },

      {
        path: "user",
        element: <UserDashboard />,
      },

      {
        path: "manage-products",
        element: <ManageProducts />,
      },

      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "AddProduct",
        element: <AddProduct></AddProduct>,
      },
    ],
  },
]);

export default router;
