# ns-vue-nami [![CircleCI](https://circleci.com/gh/jofftiquez/ns-vue-nami.svg?style=shield)](https://circleci.com/gh/jofftiquez/ns-vue-nami)
Router companion for Nativescript-Vue 2.0's Manual Routing.

Yep, that's her, Nami from One Piece. Why? Coz she's a navigator.

## Installation

**npm**

`npm install ns-vue-nami`

**yarn**

`yarn add ns-vue-nami`

## Recommended Implementation

Create a `router` folder with an `index.js` file within your `app` folder.
```
app
|- components
|- router
   |- index.js
```

**index.js**

```javascript
import Vue from 'nativescript-vue';
import NsVueNami from 'ns-vue-nami';
import login from '~/components/login';
import dashboard from '~/components/dashboard';
import isAuthenticated from 'some-authentication-module';

Vue.use(NsVueNami);

const vm = new Vue();

vm.$nami.authGuard((next) => {
  if(isAuthenticated) {
    next();
  } else {
    next('login');
  }
});

// register all routes here.
vm.$nami.init({
  routes: [
    {
      name: 'login',
      component: login,
      noAuth: true,
      entry: !isAuthenticated
    },
    {
      name: 'dashboard',
      component: dashboard,
      entry: isAuthenticated
    }
  ]
});
```

**main.js**

Just invoke the router in your `main.js`.

```javascript
import entry from './router';

new Vue({
  store,
  render: h => h('frame', [h(entry)])
}).$start();
```

## Sample Usage

**From the template**

```vue
<button @tap="$nami.navigate('foo')">Go to foo</button>
```

**From script**

```javascript
export default {
  methods: {
    someFunc() {
      this.$nami.navigate('bar');
    }
  }
}
```

## API

**.init()**

> Sets all the routable components across the whole app.
> Returns the entry component to be used in main.js as frame entry.

Router properties:
1. `name: String` - The component name of your choice.
2. `component: Vue component` - The vue component.
3. `noAuth: Boolean: default - false` - The component will NOT require authentication if set to true.
4. `entry: Boolean` - Set a particular component as entry point.

```javascript
import login from '~/components/login';
import dashboard from '~/components/dashboard';

vm.$nami.init({
  routes: [
    {
      name: 'login',
      component: login,
      entry: true
    },
    {
      name: 'dashboard',
      component: dashboard
    }
  ]
})
```

**.authGuard()**

> Will decide whether the component is routable or not based on authentication status.

```javascript
import Vue from 'nativescript-vue';
import NsVueNami from '../plugins/ns-vue-nami';

import login from '~/components/login';
import dashboard from '~/components/dashboard';

// Dummy authentication status.
const isAuthenticated = true;

Vue.use(NsVueNami);

const vm = new Vue();

vm.$nami.authGuard((next) => {
  if(isAuthenticated) {
    next();
  } else {
    next('login');
  }
});

export default vm.$nami.init({
  routes: [
    {
      name: 'login',
      component: login,
      noAuth: true,
      entry: !isAuthenticated // login will be the entry if isAuthenticated is false
    },
    {
      name: 'dashboard',
      component: dashboard,
      entry: isAuthenticated // dashboard will be the entry if isAuthenticated is true
    }
  ]
});
```

**.register()**

> Adds a new route to the list of routes on the fly.

```javascript
import cat from '~/components/cat';

vm.$nami.register({name: 'cat', component: cat});
```

**.navigate()**

```javascript
// Basic
this.$nami.navigate('cat-component');

// With props
this.$nami.navigate('cat-component', {name: 'Kidlat', color: 'Black'});
```

```vue
<button @tap="$nami.navigate('cat-component', {name: 'Kidlat', color: 'Black'})">View Cat</button>
```

**.modal()** 

> Just like `.navigate()` but shows the component on a modal.

```javascript
// Basic
this.$nami.modal('cat-component');

// With props
this.$nami.modal('cat-component', {name: 'Kidlat', color: 'Black'});
```

```vue
<button @tap="$nami.modal('cat-component', {name: 'Kidlat', color: 'Black'})">View Cat in a Modal</button>
```

**.back()** 

> Goes back to the previous component.

```javascript
this.$nami.back();
```

```vue
<button @tap="$nami.back()">Go back</button>
```