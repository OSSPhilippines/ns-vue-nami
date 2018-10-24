import { getRoute } from '../utils';
let routes = [];
let guard = null;
let vm = null;
let currentRoute = '';

export const init = (options) => {
  routes = options.routes || [];
  let entry = routes.find(route => route.entry);
  if(!entry) {
    console.warn('No entry component sepecified. Defaulting to first component in routes array.');
    entry = routes[0];
  }
  return entry.component;
}

export const register = (route) => {
  routes.push(route);
}

export const current = () => {
  return getRoute(currentRoute, routes);
}

export const navigate = async (routeName, props) => {
  const { name, component, meta, noAuth } = getRoute(routeName, routes);
  let route = null;
 
  if(!noAuth) {
    route = await new Promise((resolve) => guard(resolve));
  }

  if(route) {
    currentRoute = route.name;
    vm.$nami.navigate(route);
  } else {
    currentRoute = name;
    vm.$navigateTo(component, {props});
  }
}

export const modal = (name, props) => {
  const { component } = getRoute(name);
  vm.$showModal(component, {props});
}

export const back = () => {
  vm.$navigateBack();
}

// Hooks
export const authGuard = (fn) => {
  guard = fn;
}

export const nami = (vi) => {
  vm = vi;
  return {
    init,
    register,
    current,
    navigate,
    modal,
    back,
    authGuard
  }
}
