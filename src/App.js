import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrder from "./pages/PlaceOrder";
import OrderScreen from "./pages/OrderScreen";
import UserListScreen from "./pages/admin/UserListScreen";
import UserEditScreen from "./pages/admin/UserEditScreen";
import ProductListScreen from "./pages/admin/ProudctListScreen";
import ProductEditScreen from "./pages/admin/ProductEditScreen";
import OrderListScreen from "./pages/admin/OrderListScreen";
import CategoryListScreen from "./pages/admin/CategoryListScreen";
import CategoryEditScreen from "./pages/admin/CategoryEditScreen";
import SubCategoryListScreen from "./pages/admin/SubCategoryListScreen";
import SubCategoryEditScreen from "./pages/admin/SubCategoryEditScreen";
import CategoryScreen from "./pages/CategoryScreen";
import DashboardScreen from "./pages/admin/DashboardScreen";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/admin/AdminLayout";

function App() {
  return (
    <Router>
      {window.location.pathname.includes("/admin/") ? (
        <AdminLayout>
          <Route
            path="/admin/sub-category/:slug/edit"
            component={SubCategoryEditScreen}
            exact
          />
          <Route
            path="/admin/sub-category"
            component={SubCategoryListScreen}
            exact
          />
          <Route
            path="/admin/category/:slug/edit"
            component={CategoryEditScreen}
            exact
          />
          <Route path="/admin/category" component={CategoryListScreen} exact />
          <Route path="/admin/order" component={OrderListScreen} exact />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} exact />
          <Route path="/admin/user" component={UserListScreen} exact />
          <Route path="/admin/product" component={ProductListScreen} exact />
          <Route
            path="/admin/product/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/product/:id/edit"
            component={ProductEditScreen}
            exact
          />
          <Route path="/admin/profile" component={ProfileScreen} />
          <Route path="/admin/dashboard" component={DashboardScreen} />
          <Route path="/admin/order/:id" component={OrderScreen} />
          <Route path="/admin/product/:slug" component={ProductScreen} exact />
        </AdminLayout>
      ) : (
        <UserLayout>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/cart/:slug?" component={CartScreen} />
          <Route path="/product/:slug" component={ProductScreen} />
          <Route path="/category/:slug" component={CategoryScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
        </UserLayout>
      )}
    </Router>
  );
}

export default App;
