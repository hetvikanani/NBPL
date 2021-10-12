import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { getAuthUserID } from "modules/helper";
import Login from "container/Login";
import Leads from "container/Leads";
import Sales from "container/Sales";
import Wallet from "container/Wallet";
import Support from "container/Support";
import Profile from "container/Profile";
import Products from "container/Products";
import Partners from "container/Partners";
import UserList from "container/UserList";
import Dashboard from "container/Dashboard";
import ContactUs from "container/ContactUs";
import AdminSales from "container/AdminSales";
import PageLoader from "components/PageLoader";
import NewUser from "container/NewUserAddEdite";
import PackageList from "container/PackageList";
import AdminProduct from "container/AdminProduct";
import Registration from "container/Registration";
import SalesAddEdit from "container/SalesAddEdit";
import ProductDetail from "container/ProductDetail";
import KnowledgeBase from "container/KnowledgeBase";
import ForgetPassword from "container/ForgetPassword";
import ChangePassword from "container/ChangePassword";
import PackageAddEdit from "container/PackageAddEdit";
import PartnerAddEdite from "container/PartnerAddEdite";
// import NewUser from "container/NewUserAddEdite";
// import UserList from "container/UserList";
// import ForgetPassword from "container/Forgetpwd";
// import ResetPassword from "container/ResetPwd";
const type = localStorage.auth && JSON.parse(localStorage.auth).role;

const routes = [
  {
    path: "/login",
    exact: true,
    AuthRoute: false,
    component: Login,
  },
  {
    path: "/login/admin",
    exact: true,
    AuthRoute: false,
    component: Login,
  },
  {
    path: "/registration",
    exact: true,
    AuthRoute: false,
    component: Registration,
  },
  {
    path: "/forgetpassword",
    exact: true,
    AuthRoute: false,
    component: ForgetPassword,
  },
  {
    path: "/change-password",
    exact: true,
    AuthRoute: true,
    component: ChangePassword,
  },
  // {
  //   path: "/reset-password",
  //   exact: true,
  //   AuthRoute: true,
  //   component: ResetPassword,
  // },
  // {
  //   path: "/contact",
  //   exact: true,
  //   AuthRoute: true,
  //   component: Contact,
  // },
  {
    path: "/",
    exact: true,
    AuthRoute: true,
    component: type && type === "admin" ? Partners : Dashboard,
  },
  {
    path: "/dashboard",
    exact: true,
    AuthRoute: true,
    component: Dashboard,
  },
  {
    path: "/support",
    exact: true,
    AuthRoute: true,
    component: Support,
  },
  {
    path: "/contact-us",
    exact: true,
    AuthRoute: true,
    component: ContactUs,
  },
  {
    path: "/leads",
    exact: true,
    AuthRoute: true,
    component: Leads,
  },
  {
    path: "/products",
    exact: true,
    AuthRoute: true,
    component: Products,
  },
  {
    path: "/sales",
    exact: true,
    AuthRoute: true,
    component: Sales,
  },
  {
    path: "/sales/new",
    exact: true,
    AuthRoute: true,
    component: SalesAddEdit,
  },
  {
    path: "/users",
    exact: true,
    AuthRoute: true,
    component: UserList,
  },
  {
    path: "/user/new",
    exact: true,
    AuthRoute: true,
    component: NewUser,
  },
  {
    path: "/edit-user/:id",
    exact: true,
    AuthRoute: true,
    component: NewUser,
  },
  {
    path: "/productDetail/:name/:id",
    exact: true,
    AuthRoute: true,
    component: ProductDetail,
  },
  {
    path: "/profile",
    exact: true,
    AuthRoute: true,
    component: Profile,
  },
  {
    path: "/wallet",
    exact: true,
    AuthRoute: true,
    component: Wallet,
  },
  {
    path: "/wallet/:id",
    exact: true,
    AuthRoute: true,
    component: Wallet,
  },
  {
    path: "/knowledge-base",
    exact: true,
    AuthRoute: true,
    component: KnowledgeBase,
  },
  {
    path: "/partners",
    exact: true,
    AuthRoute: true,
    component: Partners,
  },
  {
    path: "/partner/new",
    exact: true,
    AuthRoute: true,
    component: PartnerAddEdite,
  },
  {
    path: "/partner/edit/:id",
    exact: true,
    AuthRoute: true,
    component: PartnerAddEdite,
  },
  {
    path: "/users",
    exact: true,
    AuthRoute: true,
    component: UserList,
  },
  {
    path: "/user/new",
    exact: true,
    AuthRoute: true,
    component: NewUser,
  },
  {
    path: "/product/new",
    exact: true,
    AuthRoute: true,
    component: AdminProduct,
  },
  {
    path: "/product/edit/:id",
    exact: true,
    AuthRoute: true,
    component: AdminProduct,
  },
  {
    path: "/product",
    exact: true,
    AuthRoute: true,
    component: Products,
  },
  {
    path: "/package-list/:name/:id",
    exact: true,
    AuthRoute: true,
    component: PackageList,
  },
  {
    path: "/package/:name/new/:id",
    exact: true,
    AuthRoute: true,
    component: PackageAddEdit,
  },
  {
    path: "/package/:name/edit/:id/:editid",
    exact: true,
    AuthRoute: true,
    component: PackageAddEdit,
  },
  {
    path: "/admin-sales",
    exact: true,
    AuthRoute: true,
    component: AdminSales,
  },
];
const PrivateRoute = ({ component: Component, ...rest }) => {
  if (getAuthUserID()) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/login" />;
  }
};
const RestrictedRoute = ({ component: Component, publicAccess, ...rest }) => {
  if (getAuthUserID()) {
    return (
      <Route
        {...rest}
        render={(props) =>
          publicAccess ? <Component {...props} /> : <Redirect to={"/"} />
        }
      />
    );
  } else {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
};
class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {routes.map((route, index) => {
            return !route.AuthRoute ? (
              <RestrictedRoute {...route} key={index} />
            ) : (
              <PrivateRoute {...route} key={index} />
            );
          })}
          <Route render={(props) => <h1>404 Page</h1>} />
        </Switch>
      </Suspense>
    );
  }
}
export default Routes;
