import Vue from 'vue'
import VueRouter from 'vue-router'
import Master from './components/layouts/Master'
import vuetify from './plugins/vuetify'
import {store} from './store/index'
import routes from './routes'

Vue.config.productionTip = false
Vue.use(VueRouter);

export const eventBus = new Vue();

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.isLogged){
      next({
        path: '/login'
      })
    }else{
      next()
    }
  } else if(to.matched.some(record => record.meta.requiresVisitor)){
    if(store.getters.isLogged){
      next({
        path: '/todo'
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(Master)
}).$mount('#app')
