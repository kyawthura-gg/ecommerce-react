import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
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

function App() {
  return (
    <Router>
      <>
        <Header />
        <main className="py-3">
          <Container>
            <Route
              path="/admin/subCategory/:slug/edit"
              component={SubCategoryEditScreen}
            />
            <Route
              path="/admin/subCategorylist"
              component={SubCategoryListScreen}
            />
            <Route
              path="/admin/category/:slug/edit"
              component={CategoryEditScreen}
            />
            <Route path="/admin/categorylist" component={CategoryListScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/placeorder" component={PlaceOrder} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/cart/:slug?" component={CartScreen} />
            <Route path="/product/:slug" component={ProductScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            <Route path="/" component={HomeScreen} exact />
          </Container>
        </main>
      </>
    </Router>
  );
}

export default App;
