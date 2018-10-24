
export const getRoute = (name, routes) => {
  const result = routes.find(route => route.name === name);
  if(!result) 
    return 'not found';
  return result;
}