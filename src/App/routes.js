import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { getAuthUserID } from "modules/helper";
import Login from "container/Login";
// import ForgetPassword from "container/Forgetpwd";
// import ResetPassword from "container/ResetPwd";
import PageLoader from "components/PageLoader";
import Registration from "container/Registration";
import Dashboard from "container/Dashboard";
import Leads from "container/Leads";
import Support from "container/Support";
import Products from "container/Products";
import ContactUs from "container/ContactUs";
import ProductDetail from "container/ProductDetail";
import Profile from "container/Profile";
import Sales from "container/Sales";
import SalesAddEdit from "container/SalesAddEdit";
import Wallet from "container/Wallet";
import ForgetPassword from "container/ForgetPassword";
import KnowledgeBase from "container/KnowledgeBase";
import ChangePassword from "container/ChangePassword";
import Partners from "container/Partners";
import UserList from "container/UserList";
import NewUser from "container/NewUserAddEdite";
import PartnerAddEdite from "container/PartnerAddEdite";
import AdminProduct from "container/AdminProduct";
import PackageList from "container/PackageList";
import PackageAddEdit from "container/PackageAddEdit";
import AdminSales from "container/AdminSales";

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
    AuthRoute: false,
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
    AuthRoute: false,
    component: Dashboard,
  },
  {
    path: "/dashboard",
    exact: true,
    AuthRoute: false,
    component: Dashboard,
  },
  {
    path: "/support",
    exact: true,
    AuthRoute: false,
    component: Support,
  },
  {
    path: "/contact-us",
    exact: true,
    AuthRoute: false,
    component: ContactUs,
  },
  {
    path: "/leads",
    exact: true,
    AuthRoute: false,
    component: Leads,
  },
  {
    path: "/products",
    exact: true,
    AuthRoute: false,
    component: Products,
  },
  {
    path: "/sales",
    exact: true,
    AuthRoute: false,
    component: Sales,
  }, 
  {
    path: "/add-new-sales",
    exact: true,
    AuthRoute: false,
    component: SalesAddEdit,
  }, 
  {
    path: "/productDetail/:name",
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
    path: "/users",
    exact: true,
    AuthRoute: true,
    component: UserList,
  },
  {
    path: "/add-new-user",  
    exact: true,
    AuthRoute: true,
    component: NewUser,
  },
  {
    path: "/add-new-partner",
    exact: true,
    AuthRoute: true,
    component: PartnerAddEdite,
  },
  {
    path: "/add-new-product",  
    exact: true,
    AuthRoute: true,
    component: AdminProduct,
  },
  {
    path: "/admin-product",
    exact: true,
    AuthRoute: true,
    component: Products,
  },
  {
    path: "/package-list/:name",
    exact: true,
    AuthRoute: true,
    component: PackageList,
  },
  {
    path: "/add-new-package",
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
  // if (getAuthUserID()) {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
  // } else {return <Redirect to="/login" />;}
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
