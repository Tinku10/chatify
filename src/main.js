import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import VueRouter from 'vue-router'

import home from './components/home.vue'
import chat from './components/chat.vue'
import chatroom from './components/chatroom.vue'
import login from './components/login.vue'
import register from './components/register.vue'

Vue.use(VueRouter)

// Import the Auth0 configuration
// import { domain, clientId } from "../auth_config.json";

// Import the plugin here
// import { Auth0Plugin } from "./auth";
// import { authGuard } from "../src/auth/authGuard.js";

// Install the authentication plugin here
// Vue.use(Auth0Plugin, {
//   domain,
//   clientId,
//   onRedirectCallback: appState => {
//     router.push(
//       appState && appState.targetUrl
//         ? appState.targetUrl
//         : window.location.pathname
//     );
//   }
// });

Vue.config.productionTip = false

const routes = [
  { path: "/", component: home },
  {
    path: "/login", component: login, beforeEnter(to, from, next) {
      if (localStorage.getItem('token')){
        next({path: '/chatroom'});
      } else {
        next();
      }
    }},
  { path: "/auth/google/redirect", component: home },
  {path: '/chatroom/chat/', component: chat},
  { path: "/chatroom", component: chatroom, beforeEnter(to, from, next){
    if (localStorage.getItem('token')){
      next();
    } else {
      next({ path: '/login' });
    }
  }
  
  },
  {
    path: '/register', component: register
  }
  // {path: "/chatroom/*", component: 404page"}
];

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
