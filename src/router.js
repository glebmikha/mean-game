import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signin from "./views/Signin.vue";
import Signup from "./views/Signup.vue";
import Profile from "./views/Profile.vue";
import { auth } from "@/firebase/init";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = auth.currentUser;
    if (user) {
      // User is signed in. Proceed to route
      next();
    } else {
      // No user is signed in. Redirect to login
      next({
        name: "signin"
      });
    }
  } else {
    // if route is not guarded by auth, proceed
    next();
  }
});

export default router;
