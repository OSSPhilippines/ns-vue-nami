let routes = [];
let vm = null;

const getRoute = (name) => {
  const route = routes.find(route => route.name === name);
  return route;
}

const register = (rts) => {
  routes = rts;
}

const navigate = async (name, props) => {
  const { component, beforeEnter } = getRoute(name);
  let route = null;
  
  if(beforeEnter)
    route = await new Promise(beforeEnter); 

  if(route)
    vm.$nami.navigate(route);
  else
    vm.$navigateTo(component, {props});
}

const back = () => {
  vm.$navigateBack();
}

const modal = (name, props) => {
  const { component } = getRoute(name);
  vm.$showModal(component, {props});
}

export const NsVueNami = {
  install(Vue, options) {
    vm = new Vue();
    Vue.prototype.$nami = {
      register,
      navigate,
      modal,
      back
    }
  }
}

export default NsVueNami;