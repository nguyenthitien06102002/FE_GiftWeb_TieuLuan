// import { lazy, Suspense, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Footer from "./components/Footer/Footer";
// import Loader from "./components/Loader/Loader";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Header from "./components/Header/Header";
// import NavBar from "./components/Navbar/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Checkout from "./pages/Checkout";
// import Advise from "./pages/Advise";
// import { Orders } from "./pages/Orders";
// import Account from "./pages/Account";
// import OderDetail from "./pages/OderDetail";
// import NotFount from "./pages/NotFount";

// import GetPassword from "./pages/GetPassword";
// import ResetPassword from "./pages/ResetPassword";
// import AdminLayout from "./admin/AdminLayout";

// const Home = lazy(() => import("./pages/Home"));
// const Shop = lazy(() => import("./pages/Shop"));
// const Cart = lazy(() => import("./pages/Cart"));
// const Product = lazy(() => import("./pages/Product"));



// function App() {
//   return (
//     <Suspense fallback={<Loader />}>    
//       <Router>
//         <ToastContainer
//           position="top-right"
//           autoClose={1000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
//         <AppLayout />

//       </Router>
//     </Suspense>
//   );
// }

// function AppLayout() {
//   const location = useLocation();






//   return (
//     <>

//           <Header />
//           <NavBar />



//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/shop/:categoryId" element={<Shop />} />
//         <Route path="/shop/topic/:topicId" element={<Shop />} />
//         <Route path="/shop/topic/:topicId/category/:categoryId" element={<Shop />} />
//         <Route path="/product/:id" element={<Product />} />
//         <Route path="/shop/product/:search" element={<Shop />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/advise" element={<Advise />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/account/:name" element={<Account />} />
//         <Route path="/oderDetail/:id" element={<OderDetail />} />
//         <Route path="/account/purchase/:id" element={<Account />} />
//         <Route path="/getpassword" element={<GetPassword />} />
//         <Route path="*" element={<NotFount />} />
//         <Route path="/notFound" element={<NotFount />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         <Route path="/admin" element={<AdminLayout />} />





//       </Routes>

//            <Footer />



//     </>
//   );
// }

// export default App;

import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Checkout from "./pages/Checkout";
// import Advise from "./pages/Advise";
// import { Orders } from "./pages/Orders";
// import Account from "./pages/Account";
// import OderDetail from "./pages/OderDetail";

// import GetPassword from "./pages/GetPassword";
// import ResetPassword from "./pages/ResetPassword";
import { AdminLayout } from "./admin/AdminLayout";
// import NotFount from "./pages/NotFount";
import AdminAppointments from "./admin/AdminAppointments/AdminAppointments";
import NewProduct from "./admin/NewProduct/NewProduct";
import EditProduct from "./admin/EditProduct/EditProduct";
import ListOrder from "./admin/ListOrder/ListOrder";
import DetailOrder from "./admin/ListOrder/DetailOrder";
import PrivateRoute from "./utils/PrivateRoute";
import ListUsers from "./admin/ListUsers/ListUsers";
import UserDetail from "./admin/ListUsers/UserDetail";
import ListReview from "./admin/Review/ListReview";
import ReviewDetail from "./admin/Review/ReviewDetail";
import Discount from "./admin/Discount/Discount";
import CategoryList from "./admin/AdminCategory/CategoryList";
import LogPage from "./utils/LogPage";
import Log from "./admin/Logs/Log";
import AccountRight from "./components/account/AccountRight";
import { OrderList } from "./components/account/Purchase/OrderList";
import Changepassword from "./components/account/Changepassword";
import Purchase from "./components/account/Purchase/Purchase";
import OrderDetail from "./components/account/OrderDetail";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Advise = lazy(() => import("./pages/Advise"));
const Orders = lazy(() => import("./pages/Orders"));
const Account = lazy(() => import("./pages/Account"));
const OderDetail = lazy(() => import("./pages/OderDetail"));
const GetPassword = lazy(() => import("./pages/GetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFount = lazy(() => import("./pages/NotFount"));


function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path="/admin/*" element={<PrivateRoute><AdminLayout /> </PrivateRoute>} />
          <Route path="/*" element={<DefaultLayout />} />
          {/* <Route path='/admin/appointments' element={<AdminAppointments />} /> */}
          <Route path='/admin/appointments' element={<PrivateRoute><AdminAppointments /></PrivateRoute>} />
          <Route path='/admin/newProduct' element={<PrivateRoute><NewProduct /> </PrivateRoute>} />
          <Route path='/admin/editProduct/:id' element={<PrivateRoute><EditProduct /> </PrivateRoute>} />
          <Route path='/admin/listOrder' element={<PrivateRoute><ListOrder /> </PrivateRoute>} />
          <Route path='/admin/listUsers' element={<PrivateRoute><ListUsers /> </PrivateRoute>} />
          <Route path='/admin/detail/:id' element={<PrivateRoute><DetailOrder /> </PrivateRoute>} />
          <Route path='/admin/userDetail/:id' element={<PrivateRoute><UserDetail /> </PrivateRoute>} />
          <Route path='/admin/listReview' element={<PrivateRoute><ListReview /> </PrivateRoute>} />
          <Route path='/admin/reviewDetail/:id' element={<PrivateRoute><ReviewDetail /> </PrivateRoute>} />
          <Route path='/admin/list-discount' element={<PrivateRoute><Discount /> </PrivateRoute>} />
          <Route path='/admin/list-category' element={<PrivateRoute><CategoryList /> </PrivateRoute>} />
          <Route path='/admin/log' element={<PrivateRoute><Log /> </PrivateRoute>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

function DefaultLayout() {
  return (
    <>
      <Header />
      {/* <NavBar /> */}
      <AppRoutes />
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    
    <Routes>

  
      <Route path="/" element={<Home />} />

      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:categoryId" element={<Shop />} />
      <Route path="/shop/topic/:topicId" element={<Shop />} />
      <Route path="/shop/topic/:topicId/category/:categoryId" element={<Shop />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/shop/product/:search" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/advise" element={<Advise />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/account/purchase/:id" element={<Account />} />

      <Route path="/account" element={<Account />}>
        <Route index element={<AccountRight />} />
        <Route path="info" element={<AccountRight />} />
        <Route path="changepassword" element={< Changepassword />} />
        <Route path="purchase" element={< Purchase />} />
        <Route path="purchase/order-details/:id" element={< OrderDetail />} />      
      </Route>

      <Route path="/getpassword" element={<GetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
     
      <Route path="*" element={<NotFount />} />
      <Route path="/notFound" element={<NotFount />} />
    </Routes>


  );
}

export default App;

