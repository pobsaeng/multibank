import Vue from "vue";
import Router from "vue-router";
import Admin from "@/components/Admin";
import Cheque from "@/components/Cheque";
import Home from "@/components/Home";
import Daily from "@/components/Daily";
import Report from "@/components/Report";
import Customer from "@/components/Customer";
import Login from "@/components/Login";
import UserManagement from "@/components/UserManagement";
Vue.use(Router);

const guard = (to, from, next) => {
  // if (localStorage.jwtToken) {
  //   // next();
  //   next({ path: "/daily" });
  // } else {
  //   next({ path: "/login" });
  // }
  // next({ path: "/holiday" });
};

export default new Router({
  routes: [
    {
      path: "/sdf",
      name: "",
      // beforeEnter: guard,
      activate: function() {
        this.$nextTick(function() {
          // => 'DOM loaded and ready'
          alert("test");
        });
      }
    },
    {
      path: "/usermanagement",
      name: "UserManagement",
      component: UserManagement
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin
    },
    {
      path: "/cheque",
      name: "Cheque",
      component: Cheque
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/holiday",
      name: "Daily",
      component: Daily
    },
    {
      path: "/customer",
      name: "Customer",
      component: Customer
    },
    {
      path: "/report",
      name: "Report",
      component: Report
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      // meta: { requiresAuth: true },
      // beforeEnter: (to, from, next) => {
      //   console.log("***");
      //   document.body.className += "hold-transition login-page";
      //   next();
      // }
    },
    {
      // not found handler
      path: "*",
      redirect: "/holiday"
    }
  ]
});
