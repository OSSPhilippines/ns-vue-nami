# ns-vue-nami
Router companion for Nativescript-Vue 2.0's Manual Routing.

Yep, that's her. Nami from One Piece. Why? Coz she's a navigator. My kind of navigator. ;)

## Installation

**npm**

`npm install ns-vue-nami`

**yarn**

`yarn add nami`

## Recommended Implementation

Create a `router` folder with in an `index.js` file within your `app` folder.
```
app
|- components
|- router
   |- index.js
```

**index.js**

```javascript
import Vue from 'nativescript-vue';
import NsVueRouter from 'ns-vue-nami';
import foo from '~/components/foo';
import bar from '~/components/bar';

Vue.use(NsVueNami);

const vm = new Vue();

// register all routes here.
vm.$nami.register([
  {
    name: 'foo',
    component: foo
  },
  {
    name: 'bar',
    component: bar
  }
]);
```

**main.js**

Just invoke the router in your `main.js`

```javascript
import './router/router';
```

## Recommended Usage

**From the template**

```vue
<button @tap="$nami.navigate({name: 'foo'})">Go to foo</button>
```

**From script**

```javascript
export default {
  methods: {
    someFunc() {
      this.$nami.navigate({name: 'bar'});
    }
  }
}
```

## API

> **.navigate({name: '', props: {}})**

Navigates to a given route.

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| `name` | String | Yes | Name of the registered route to be navigated to. | 
| `props` | Object | No | Optional `props` to be passed to the destination component. |
